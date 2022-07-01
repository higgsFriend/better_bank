import React from 'react';
import Axios from 'axios';
import { Context, url_base, Card, auth } from './context';
import { createUserWithEmailAndPassword } from "firebase/auth";


function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { useEffect } = React;
  const [disableSubmit, setDisableSubmit] = React.useState(true);
  const ctx = React.useContext(Context);

  // Perform validations automagically if they change value
  useEffect(() => {
    if (!validate(name, 'Name')) return;
    if (!validate(email, 'Email')) return;
    if (!validate(password, 'Password')) return;
    setDisableSubmit(false);
  }, [ctx.userList, name, email, password]);

  // Validate the entries
  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label + ' must not be empty.');
      setTimeout(() => setStatus(''), 2500);
      setDisableSubmit(true);
      return false;
    }
    return true;
  }

  // Handle creating user
  function handleCreate() {
    console.log(name, email, password);

    // Validate no nulls
    if (!validate(name, 'Name')) return;
    if (!validate(email, 'Email')) return;
    if (!validate(password, 'Password')) return;

    // Confirm user does not already exist

    // Create the user in the db
    Axios.post(url_base + '/createUser', {
      name: name,
      email: email
    }).then(() => {
      // setUpdateRequired(true);
      console.log(`Created a new human named ${name}`);
      createFirebaseUser(email, password,'email_and_pass')
    })
    setShow(false);
  }

  // Create user in Firebase
  function createFirebaseUser(email, password, method) {
    if (method === 'email_and_pass') {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(`Logged in: ${JSON.stringify(user)}`);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`Error: ${errorMessage}`)
        });
    }
    else if (method === 'google') {
      console.log(`Login failed: Google auth not implemented yet.`);
    }
    else {
      console.log(`Login failed: Unknown method of login.`);
    }
  }

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (
        <>
          Name<br />
          <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br />
          Email address<br />
          <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />
          Password<br />
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br />
          <button disabled={disableSubmit} type="submit" className="btn btn-light" onClick={handleCreate}>Submit</button>
        </>
      ) : (
        <>
          <h5>Success</h5>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
        </>
      )}
    />
  )
}

export default CreateAccount;