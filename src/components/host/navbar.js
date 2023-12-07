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
    <Nav.Link href="/host/dashboard">HostDashboard</Nav.Link>
    <Nav.Link href="/host/mycars">My Cars</Nav.Link>
    
  </Nav>
  <Nav className="justify-content-end">
        
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {
              localStorage.getItem('isLoggedIn')?
              <React.Fragment>
              <Navbar.Text >
              signed in as :<span style={{color: "white"}}> 
              {localStorage.getItem('username')} 
              </span>
            </Navbar.Text>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-danger btn-sm ml-4"variant="outline-light" onClick={()=>{
              localStorage.clear();
              navigate('/auth/login?msg=Logged out successfully')
            }}>Logout</button>
            </React.Fragment>
            : 
            <button className="btn btn-danger" variant="outline-light" onClick={()=>navigate('/auth/login')}>Login</button>
            }
           
          </Nav>
</Container>
</Navbar>
  )
}
export default HostNavbar;