// import React from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <>
      <br />
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to="/admin">
            Admin Page
          </Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/admin/booking">
             Booking Management
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/doctor-schedule">
              Doctor Schedule
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/customer-management">
              Customer Management
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/service-management">
              Service Management
            </Nav.Link>

            <Nav.Link as={Link} to="/admin/report">
              Report
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminSideBar;
