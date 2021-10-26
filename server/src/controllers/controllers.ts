import ContactModel from "../models/contact";
import type { Contact } from "../models/contact";
import type express from "express";
import { verifyPhone } from "../utils/verifyPhone";
import { Error } from "mongoose";

const getAllContacts = async (_req: express.Request, res: express.Response) => {
  try {
    const contacts = await ContactModel.find({}).sort({ fullname: 1 }).exec();
    if (contacts) {
      return res.status(200).json(contacts);
    }
    return res.status(404).send("None");
  } catch (e) {
    console.error(e);
    return res.status(500).send("Server error! Please try again later.");
  }
};

const getContactByName = async (
  req: express.Request,
  res: express.Response
) => {
  if (req.params && req.params.fullname) {
    const { fullname } = req.params as { fullname: string };
    try {
      const allContacts = await ContactModel.find({
        fullname: fullname.trim().toLowerCase(),
      });
      if (allContacts) return res.status(200).json(allContacts);
      return res.status(404).send("None");
    } catch (e) {
      console.error(e);
      return res.status(500).send("Server error! Please try again later.");
    }
  }
  return res.status(400).send("Bad request.");
};

const setNewContact = async (req: express.Request, res: express.Response) => {
  const { fullname, phone, description } = req.body as Contact;
  // Validation
  if (!fullname.trim() || fullname.length > 32)
    return res
      .status(400)
      .send("Please provide a valid fullname. (max: 32 characters)");
  if (!phone.trim() || !verifyPhone(phone))
    return res.status(400).send("Please provide a valid phone number.");
  // Creating new contact
  const newContact = new ContactModel({
    fullname: fullname.toLowerCase().trim(),
    phone: phone.trim(),
    description,
  });
  try {
    const contact = await newContact.save();
    return res.status(201).json(contact);
  } catch (e: any) {
    if (e.name === "MongoServerError" && e.code === 11000) {
      return res.status(400).send("Number already exists.");
    }
    console.error(e);
    return res.status(500).send("Server error! Please try again later.");
  }
};
export default {
  getAllContacts,
  getContactByName,
  setNewContact,
};
