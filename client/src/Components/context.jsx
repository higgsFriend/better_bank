import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// export const UserContext = React.createContext(null);
export const Context = React.createContext(null);
export const minimumTransaction = 0.01;
// export const host = "54.161.66.90";
export const host = "ec2-44-206-42-110.compute-1.amazonaws.com"
export const url_base = `http://${host}:3001`;

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
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();

// Initialize oauth
export const auth = getAuth(app);

function Card(props) {

  function classes() {
    const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
    return 'card mb-3 ' + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "18rem" }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.body}
        {props.status && (<div id='createStatus'>{props.status}</div>)}
      </div>
    </div>
  );
}

export {Card};

