import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";

function NavbarComponent() {
  const navigate = useNavigate();

  return (
    <div className="mb-4 navstyle">
      <Navbar  >
        <Container  >
          <Navbar.Brand href="#home" style={{color: "white"}}onClick={() => navigate('/home')} className=" fa-home "><h4>Home</h4></Navbar.Brand>
          
          <Nav className="me-auto">
            <Nav.Link style={{color: "white"}} onClick={() => navigate('/customer/dashboard')}>CustomerDashboard</Nav.Link>
            
            {/* <Nav.Link onClick={() => navigate('/customer/dashboard?page=cart')}>Previous Bookings</Nav.Link> */}
          </Nav>
          <Nav className="justify-content-end">
          <button className="btn btn-primary" onClick={()=>navigate('/auth/login')}>Login</button>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;