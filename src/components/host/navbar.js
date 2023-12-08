import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function HostNavbar() {
  const navigate = useNavigate();

  const buttonStyle = {
    color: "white", // Set text color to white
  };

  return (
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
          <Button className="btn btn-warning btn-sm">
            <Nav.Link href="/host/update_profile" style={buttonStyle}>
              <FontAwesomeIcon icon={faUser} /> Profile
            </Nav.Link>
          </Button> &nbsp;&nbsp;&nbsp;
          {localStorage.getItem("isLoggedIn") ? (
            <React.Fragment>
              <Navbar.Text style={{ color: "black" }}>
                signed in as :<span style={{ color: "white" }}>
                  {localStorage.getItem("username")}
                </span>
              </Navbar.Text>
              &nbsp;&nbsp;&nbsp;
              <Button
                className="btn btn-danger btn-sm ml-2"
                onClick={() => {
                  localStorage.clear();
                  navigate("/auth/login?msg=Logged out successfully");
                }}
                style={buttonStyle}
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </Button>
            </React.Fragment>
          ) : (
            <Button
              className="btn btn-danger btn-sm"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default HostNavbar;
