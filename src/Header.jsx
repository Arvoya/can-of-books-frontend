import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import {withAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";

class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;


    return (
         <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem style={{ marginRight: '20px' }}><Link to="/" className="nav-link" style={{color: 'white'}}>Home</Link></NavItem>
        <NavItem style={{ marginRight: '20px' }}><Link to="/about" className="nav-link" style={{color: 'white'}}>About</Link></NavItem>
        {isAuthenticated &&
        <NavItem style={{ marginRight: '20px' }}><Link to="/profile" className="nav-link" style={{color: 'white'}}>Profile</Link></NavItem>
        }
        {isAuthenticated ? <Logout/> : <Login/>}
      </Navbar>
         </>
    )
  }
}

export default withAuth0(Header);
