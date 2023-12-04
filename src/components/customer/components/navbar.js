import { useState } from "react";
import { Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";  // Import the search icon from Font Awesome

function NavbarComponent() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    // Redirect to cars page with the search query
    navigate(`/customer/cars?source=${searchValue}`);
  };

  return (
    <div className="mb-4 navstyle">
      <Navbar>
        <Container>
          <Navbar.Brand href="#home" style={{ color: "red" }} onClick={() => navigate('/home')} className=" home ">
            <h4>CarRent</h4>
          </Navbar.Brand>
          <Navbar.Brand href="#home" style={{ color: "white" }} onClick={() => navigate('/home')} className=" home ">
            <h4>🏠Home</h4>
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link style={{ color: "white" }} onClick={() => navigate('/customer/dashboard')}>
              <h4>CustomerDashboard</h4>
            </Nav.Link>
          </Nav>

          <Form className="d-flex">
            <FormControl
              type="text"
              placeholder="Search by source"
              className="mr-2"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button variant="outline-success" onClick={handleSearch}>
              {/* Use the search icon here */}
              <FaSearch />
            </Button>
          </Form>

          <Nav className="justify-content-end">
            <button className="btn btn-info" onClick={() => navigate('/help')}>Help</button>
            &nbsp;
            <button className="btn btn-warning" onClick={() => navigate('/host/dashboard')}>Sign up as Host</button>
            &nbsp;
            <button className="btn btn-primary" onClick={() => navigate('/auth/login')}>Login</button>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
