import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  const navigate = useNavigate();

  return (
    <div className="mb-4 navstyle">
      <Navbar  >
        <Container  >
        <Navbar.Brand href="#home" style={{color: "red"}} onClick={() => navigate('/home')} className=" home "><h4>CarRent</h4></Navbar.Brand>
          <Navbar.Brand href="#home" style={{color: "white"}}onClick={() => navigate('/home')} className=" home "><h4>🏠Home</h4></Navbar.Brand>
          
          <Nav className="me-auto">
            <Nav.Link style={{color: "white"}} onClick={() => navigate('/customer/dashboard')}><h4>CustomerDashboard</h4></Nav.Link>

            
            
          </Nav>
          <Nav className="justify-content-end">
          
         
          <button className="btn btn-info" onClick={() => navigate('/help')} > Help</button>
          &nbsp;
          <button className="btn btn-warning" onClick={() => navigate('/host/dashboard')} > Sign up as Host</button>
          &nbsp;
          <button className="btn btn-primary" onClick={()=>navigate('/auth/login')}>Login</button>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;