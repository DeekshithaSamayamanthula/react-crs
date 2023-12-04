import { Button, CardBody, CardSubtitle, CardText, CardTitle, Image, Nav } from "react-bootstrap";
import NavbarComponent from "./navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap/esm";
import eternity from "../../../assets/car.jpg"
// import { Card } from "react-bootstrap/esm";
// import {  CardBody, CardText, CardTitle } from "react-bootstrap";
// import { CardSubtitle } from "react-bootstrap";
function Cars(){
  const [source, setSource] = useState('');
  const [cars, setCars] = useState([]);
  const location = useLocation(); // Use useLocation hook

  useEffect(() => {
    // Retrieve source from query parameters
    const searchParams = new URLSearchParams(location.search);
    const sourceFromQuery = searchParams.get("source");
    console.log("Source from query:", sourceFromQuery);
    if (sourceFromQuery) {
      setSource(sourceFromQuery);
      // Now you can use the 'sourceFromQuery' in your API call
      axios.get(`http://localhost:9191/car/get/availablecars/${sourceFromQuery}`)
        .then(response => setCars(response.data))
        .catch(error => console.error('Error fetching available cars:', error));
    }
  }, [location.search]); // Add location.search to the dependency array

    return(
        <div>
         
         <div>
    <NavbarComponent />
    <h3 style={{ color: "Green" ,fontWeight:"bold"}}> Available Cars</h3>
</div>
<div className="row" style={{ paddingLeft: "56px" }}>
              {cars.map((p, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <Card
                    style={{
                      width: "25rem",
                      height: "15rem",
                      padding:"1px",
                      borderColor:"darkmagenta"
                    }}
                  >
                    {/* <center><Image width={280} src={eternity} /></center> */}
                    <CardBody >
                      <CardTitle><h3>{p.carModel}</h3></CardTitle>
                      <CardSubtitle  style={{ color: "red" ,textAlign:"center"}}>
                        Rent Price(per day): INR. {p.price}
                      </CardSubtitle>
                      <br></br>
                      <CardText style={{ color: "blue" ,textAlign:"center", fontWeight:"500"}}>seating:{p.seating}</CardText>
                      {/* <CardText style={{ color: "purple" ,textAlign:"center", fontWeight:"500"}}>insurance:{p.insurance}</CardText> */}
                      <CardText style={{ color: "magenta" ,textAlign:"center" , fontWeight:"500"}}>source:{p.source}</CardText>
                      <Button as={Link} to="/customer/bookcar" >Book Car</Button>
                    </CardBody>
                  </Card>
                  <Nav.Link> </Nav.Link>
                </div>
              ))}
            </div>

      </div>
    )
}
export default Cars;