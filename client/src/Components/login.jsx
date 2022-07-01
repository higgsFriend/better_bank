import React from 'react';
import Axios from 'axios';
// import {Card} from './context';
import { Context, url_base, Card, auth } from './context';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [status, setStatus] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [disableSubmit, setDisableSubmit] = React.useState(true);
  const { useEffect } = React;
  const ctx = React.useContext(Context);
  // const [currentUserIndex, setCurrentUserIndex] = React.useState(ctx.currentUserIndex);

  // Authenticate user with Firebase
  function authenticateUserWithFirebase(email, password, method) {
    let success = false;
    if (method === 'email_and_pass') {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(`Logged in: ${JSON.stringify(user)}`);
          console.log(`${user.email} is a valid user`);
          // ctx.setCurrentUser({ email: user.email });
          ctx.updateUser({ email: user.email });
          dbLookupUserDetails(user.email);
          success = true;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          ctx.setCurrentUser({ email: null });
        });
    }
    else if (method === 'google') {
      console.log(`Login failed: Google auth not implemented yet.`);
    }
    else {
      console.log(`Login failed: Unknown method of login.`);
    }

    return success;
  }

  // Lookup/set user details
  function dbLookupUserDetails(userEmail) {
    Axios.get(url_base + '/getUser', {
      params: { email: userEmail }
    }).then((result) => {
      console.log(`Result: ${JSON.stringify(result)}`);
      const balance = result.data[0].balance;
      const name = result.data[0].name;
      ctx.updateUser({name:name, balance:balance})
      console.log(`${name}, you have $${balance} in your account.`)
    });
  }

  // Handle logging out
  function handleLogout() {
    ctx.currentUserIndex = null;
    // setCurrentUserIndex(ctx.currentUserIndex);
    // ctx.setCurrentUser({ email: null });
    ctx.updateUser({email:null})
    console.log(`Logging out.`);
  }

  // Handle logging in
  function handleLogin() {

    // Authenticate with Firebase.  If successful lookup details in the db
    const isSuccess = authenticateUserWithFirebase(userEmail, userPassword, "email_and_pass");

    // Handle some primative animation
    setTimeout(() => {
      setStatus('');
      setUserEmail('');
      setUserPassword('');
      setDisableSubmit(false);
    }, 3000);
  }

  // Do fancy stuff with the buttons while user is logging in
  useEffect(() => {
    if (userEmail && userPassword) {
      setDisableSubmit(false);
    }
    else {
      setDisableSubmit(true);
    }
  }, [userEmail, userPassword]);

  // Fancy rendering for current user
  useEffect(() => {
    const userEmail = ctx.currentUser['email'];
    let msg = 'Invalid email or password!'

    if (userEmail != null) {
      msg = `Welcome ${userEmail}.`;
    }

    setStatus(msg);
    setDisableSubmit(false);
  }, [ctx.currentUser]);

  return (
    <Card
      bgcolor="primary"
      header="Login"
      status={status}
      body={
          ctx.currentUser['email'] == null ? (
          <>
            Email: <br />
            <input type="input" placeholder="Email" value={userEmail} className="form-control" id="email" onChange={e => setUserEmail(e.currentTarget.value)} /><br />
            Password: <br />
            <input type="password" placeholder="Password" value={userPassword} className="form-control" id="password" onChange={e => setUserPassword(e.currentTarget.value)} /><br />
            <button disabled={disableSubmit} type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
          </>
        ) : (
          <>
            Logged in as: <br />
            {ctx.currentUser.email} <br/>
            <button type="submit" className="btn btn-light" onClick={handleLogout}>Logout</button>
          </>
        )
      }
    />
  )
}

export default Login;