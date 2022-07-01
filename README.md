## Local testing
- Create a network alias (in /etc/hosts) 127.0.0.1 to mongo_db and node_server

## Deploy
- Use an AWS ec2
- Install docker: 
  sudo yum install docker
- Create a docker network:
  docker network create bank-network
- Start a mongodb instance on the ec2:
  sudo docker run -d --net bank-network -p 27017:27017 --name mongo_db mongo:latest
- Create a docker file for the server application and build
  docker build . -t badbank-server
- Create a docker file for the client application and build
  docker build . -t badbank-client

- Run the server:
  docker run --name node_server --net bank-network -p3001:3001 badbank-server
- Run the client:
  docker run --name node_client --net bank-network -p3000:3000 badbank-client



## TODO : https://student.emeritus.org/courses/3289/files/3139906/download?wrap=1
1. User Account
• User can create an account with an email address and password input field. DONE
• User receives a success message after creating an account. DONE
• Context – after creating an account, email address or username appears in the top right corner. DONE.

2. Login
• User can log in to an account with an email address/password or OAuth.
• User can log out of an account. DONE.

3. Deposit
• User can deposit money. DONE.
• Total balance updates according to deposit amount. DONE.
• The total balance amount and any other user input persists through different user sessions. Logging out of the application does not reset the user data. DONE.

4. Withdraw
• User can withdraw money. DONE.
• Total balance updates according to withdrawal amount. DONE.
• The total balance amount and any other user input persists through different user sessions. Logging out of the application does not reset the user data. DONE.

5. Database
• Screenshot

6. Deployed to Cloud

7. Other (bonus)
• Roles for different users, such as a bank employee vs customer (authorization)
• Money transfer between users
• Account types, such as checking vs savings accounts
• Assignment of random account numbers to new accounts
• User profile updates that are persistent
• Check deposit by taking a picture of the check

8. Video Presentations
Video 1: Front-End Architecture, Authentication, And App Diagram
Video 2: Database And API
Video 2: Database And API


## Create the client as a react application
mkdir client && cd client
npx create-react-app .
rm App.test.js index.css logo.svg serviceWorker.js setupTests.js
npm install axios

## Create the server
mkdir server && cd server
npm init
npm install express nodemon cors mongoose

## Create a Firebase project
-Make it a 'web' application

## Start using Firebase
npm install -g firebase-tools
npm install firebase

https://firebase.google.com/docs/web/setup#available-libraries

## OAuth2 setup
https://console.cloud.google.com/apis/credentials?project=mern-course-5a556
 (make sure domain is allowed)

## Create Cloud mongodb
user: mongo-master
pass: t1ZTwlkHNhXogoKP

Enable IP to connect in settings

connection url: mongodb+srv://mongo-master:<password>@cluster0.spgjtrd.mongodb.net/?retryWrites=true&w=majority
compass url: mongodb+srv://mongo-master:<password>@cluster0.spgjtrd.mongodb.net/test

## Firebase creds. (Client side)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkWJFhqm6P8JZPjXMVlQoEZpurPq2nNw8",
  authDomain: "bankcrud-112fc.firebaseapp.com",
  projectId: "bankcrud-112fc",
  storageBucket: "bankcrud-112fc.appspot.com",
  messagingSenderId: "491833932702",
  appId: "1:491833932702:web:75c328d2f426ecfba7b48f",
  measurementId: "G-PJHSV51ZY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

## Firebase, React, Express examples
https://www.youtube.com/watch?v=Jfkme6WE_Dk
https://github.com/Chensokheng/firebase-auth-express.js

https://www.youtube.com/watch?v=XhjCx__0L88
https://github.com/chelseafarley/google-cloud-functions

https://www.youtube.com/watch?v=vDT7EnUpEoo
https://github.com/machadop1407/react-firebase-google-authentication

