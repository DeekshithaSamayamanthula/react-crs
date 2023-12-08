import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

function NavbarComponent() {
  const navigate = useNavigate();
  const [sourceOptions, setSourceOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedSource, setSelectedSource] = useState([]);

  useEffect(() => {
    // Fetch source options from the API
    fetch("http://localhost:9191/car/getall")
      .then((response) => response.json())
      .then((data) => {
        // Extract unique source values from the data
        const uniqueSources = Array.from(new Set(data.map((car) => car.source)));
        setSourceOptions(uniqueSources);
        setFilteredOptions(uniqueSources); // Initially set the filtered options to all options
      })
      .catch((error) => console.error("Error fetching source options:", error));
  }, []);

  const handleSearch = () => {
    // Redirect to cars page with the selected source query
    const selectedSourceValue = selectedSource.length > 0 ? selectedSource[0] : "";
    navigate(`/all?source=${selectedSourceValue}`);
  };

  const handleKeyDown = (e) => {
    // Handle Enter key to trigger search
    if (e.key === "Enter" && selectedSource.length === 0) {
      e.preventDefault();
      // Optionally, you can add additional logic or feedback for the user
      // if they press Enter without selecting any source.
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleInputChange = (text) => {
    // Filter options based on the text input
    const filtered = sourceOptions.filter((option) =>
      option.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  return (
    <div className="mb-4 navstyle">
      <Navbar>
        <Container>
          <Navbar.Brand style={{ color: "red" }} onClick={() => navigate('/')}>
            <h4>CarRent</h4>
          </Navbar.Brand>
          <Navbar.Brand style={{ color: "white" }} onClick={() => navigate('/')}>
            <h4>🏠Home</h4>
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link style={{ color: "white" }} onClick={() => navigate('/customer/dashboard')}>
              <h4>CustomerDashboard</h4>
            </Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Typeahead
              id="searchSource"
              labelKey="source"
              options={filteredOptions}
              placeholder="Search by source"
              onChange={(selected) => setSelectedSource(selected)}
              selected={selectedSource}
              onKeyDown={handleKeyDown}
              onInputChange={(text) => handleInputChange(text)}
            />
            <Button variant="outline-success" onClick={handleSearch}>
              <FaSearch />
            </Button>
          </Form>

          <Nav className="justify-content-end">
            <button className="btn btn-info" onClick={() => navigate('/help')}>
              Help
            </button>
            &nbsp;
            <button className="btn btn-warning" onClick={() => navigate('/host/auth/signup')}>
              Sign up as Host
            </button>
            &nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {localStorage.getItem('isLoggedIn') ? (
              <React.Fragment>
                <Navbar.Text style={{ color: "white" }}>
                  signed in as :
                  <span style={{ color: "white" }}>{localStorage.getItem('username')}</span>
                </Navbar.Text>
                &nbsp;&nbsp;&nbsp;
                <button
                  className="btn btn-danger btn-sm ml-4"
                  variant="outline-light"
                  onClick={() => {
                    localStorage.clear();
                    navigate('/auth/login?msg=you have logged out..');
                  }}
                >
                  Logout
                </button>
              </React.Fragment>
            ) : (
              <button className="btn btn-primary" variant="outline-light" onClick={() => navigate('/auth/login')}>
                Login
              </button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
