import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import React, { Component } from "react";

import logo from "../images/logo.svg";

const MenuInstitute = ({ userType }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" collapseOnSelect>
      <Container>
        <LinkContainer to="/institute/profile">
          <Navbar.Brand>
            <img src={logo} alt="Expertire" style={{ width: "2.5rem" }} />
            <span> Expertire</span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/institute/profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/institute/requests/posts">
              <Nav.Link>Requests</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/institute/timeline">
              <Nav.Link>Timeline</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/logout">
              <Nav.Link>Log out</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuInstitute;
