# Phone book main repository 

## Getting Started
To get a local copy up and running follow these steps.

### Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js
* docker
* docker-compose

### Cloning The GitHub Repository

```bash
git clone https://github.com/Danielstep4/phone-book-app.git
cd phone-book-app

```
## Windows Users
### Create .env file in server and add MONGO_URL (Port: 27017)
```bash
cd server
type nul > .env

```
### Create .env file in client and add REACT_APP_API_URL with the server port (8081)
```bash
cd ../client
type nul > .env

```

<hr>

## Running Your Application 
start the app server:

```bash
docker-compose up --build
```

# Usage 
- Once the app is up and running the client will be exposed to port 3000
- Server will be exposed to port 8081
  

### UI Code
[Phone book UI repository](https://github.com/danielstep4/phone-book-ui)
### Server Code
[Phone book server repository](https://github.com/danielstep4/phone-book-server)
