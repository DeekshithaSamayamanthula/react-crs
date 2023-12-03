import { Button, CardBody, CardSubtitle, CardText, CardTitle, Image, Nav } from "react-bootstrap";
import NavbarComponent from "./navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap/esm";
import eternity from "../../../assets/car.jpg"
// import { Card } from "react-bootstrap/esm";
// import {  CardBody, CardText, CardTitle } from "react-bootstrap";
// import { CardSubtitle } from "react-bootstrap";
function Cars(){
  const [cars,setCars] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:9191/car/getall')
    .then(response=>setCars(response.data))
})
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
                      height: "25rem",
                      padding:"1px",
                      borderColor:"darkmagenta"
                    }}
                  >
                    <center><Image width={280} src={eternity} /></center>
                    <CardBody >
                      <CardTitle><h3>{p.carModel}</h3></CardTitle>
                      <CardSubtitle  style={{ color: "red" ,textAlign:"center"}}>
                        Rent Price: INR. {p.price}
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