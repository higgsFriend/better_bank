import React from 'react';
import { Navbar, Container, Nav, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Context, url_base, Card, auth } from './context';

import { Link } from 'react-router-dom';


function Header() {
  const ctx = React.useContext(Context);
  const currentUserEmail = ctx.currentUser.email;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home">'Da Bad Bank'</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="homi">Our nice home page.</Tooltip>}>
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="login">Go here to login to our application.</Tooltip>}>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="login">Go ahead create an account, it's free!</Tooltip>}>
              <Nav.Link as={Link} to="/CreateAccount">Create Account</Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="depo">Go here to deposit money into your account (after logging in).</Tooltip>}>
              <Nav.Link as={Link} to="/deposit">Deposit</Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="withdrawfromsociety">Go here to withdraw money from your account (after logging in).</Tooltip>}>
              <Nav.Link as={Link} to="/withdraw">Withdraw</Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="allData">Go here to see yours and everyone elses password!  We believe in full transparency.</Tooltip>}>
              <Nav.Link as={Link} to="/alldata">AllData</Nav.Link>
            </OverlayTrigger>

          </Nav>
        </Navbar.Collapse>
      </Container>
      <Container>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="login">{currentUserEmail}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar >

  );
}

export default Header;