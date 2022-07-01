import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useContext } from "react";

// User defined elements
import Header from './Header';
import Home from './home';
import CreateAccount from './createaccount';
import Login from './login';
import Deposit from './deposit';
import Withdraw from './withdraw';
import Balance from './balance';
import AllData from './alldata';
import { Context } from "./context";



function Bank() {
  const value = useContext(Context);
  // let currentUser = value.currentUser;
  // let userList = value.userList;

  // userList.map((user) => {
  //   console.log(`User: ${JSON.stringify(user)}`);
  // })

  return (
    <Router>
      <Container>
        {/* <NavBar /> */}
        <Header />
        
        {/* <UserContext.Provider value={{currentUserIndex:null},{ users: [{ name: 'kingpin', email: 'kingping@crimeboss.com', password: 'cashinmypocket', balance: 1000 }] }}> */}
          {/* <div className="container" style={{padding: "20px"}}> */}
          <Routes>
            {/* <Route path="/:page" element={<Header/>} /> */}
            <Route path="" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route exact path="/CreateAccount" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route exact path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/alldata" element={<AllData />} />
          </Routes>
        {/* </UserContext.Provider> */}
      </Container>
    </Router>
  );
}

export default Bank;

