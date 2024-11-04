// import React from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const VeterianSideBar = () => {
  return (
    <>
      <br />
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Veterian Page
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/veterian/doctor-schedule">
              My Schedule
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/admin/customer-management">
              Patient Management
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default VeterianSideBar;
