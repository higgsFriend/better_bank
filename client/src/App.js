import React, { useState, useEffect, createContext } from 'react';
import Axios from 'axios';

import './App.css';
import { Context, url_base } from "./Components/context";
import Bank from './Components/Bank';


function App() {
  const [userList, setUserList] = useState([]);
  const [updateRequired, setUpdateRequired] = useState(true);
  const [currentUser, setCurrentUser] = useState({name: null, email: null, balance: -1, isAdmin: false});
  let contextValue = { userList, currentUser, setCurrentUser, setUpdateRequired, updateUser };

  // Refresh the user list as needed
  useEffect(() => {
    if (updateRequired === true) {
      Axios.get(url_base + '/allUsers').then((response) => {
        setUserList(response.data);
        setUpdateRequired(false);
      })
    }
  }, [updateRequired]);

  function updateUser(newVals) {

    let target  = currentUser;
    console.log(`Updating user ${JSON.stringify(target)} from ${JSON.stringify(newVals)}`);
    target = Object.assign(target, newVals);
    console.log(`After update ${JSON.stringify(target)}`);
    setCurrentUser(target);
    // setUpdateRequired(true);

    // Update the user in the db
    Axios.put(url_base + '/updateUser', {
      email: target.email,
      balance: target.balance
    }).then((response) => {
      setUpdateRequired(true);
      console.log(`Updated a old human ${target.email}..${response}`);
      // createFirebaseUser(email, password,'email_and_pass')
    });

  };

  return (
    <Context.Provider value={contextValue}>
      <Bank></Bank>
    </Context.Provider>

  );
}

export default App;

