import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HostNavbar() {
  const navigate = useNavigate();
  return(
<Navbar bg="primary" data-bs-theme="dark">
<Container>
  <Navbar.Brand href="#home">CarRent</Navbar.Brand>
  <Nav className="me-auto">
    <Nav.Link href="">Home</Nav.Link>
    <Nav.Link href="">My Cars</Nav.Link>
    
  </Nav>
  <Nav className="justify-content-end">
        
            <button className="btn btn-danger" variant="outline-light" onClick={()=>navigate('/auth/login')}>Logout</button>
           
          </Nav>
</Container>
</Navbar>
  )
}
export default HostNavbar;