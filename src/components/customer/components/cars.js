import { Button, CardBody, CardSubtitle, CardText, CardTitle, Image, Nav } from "react-bootstrap";
import NavbarComponent from "./navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap/esm";
import eternity from "../../../assets/car.jpg"
import Login from "../../auth/login";
// import { Card } from "react-bootstrap/esm";
// import {  CardBody, CardText, CardTitle } from "react-bootstrap";
// import { CardSubtitle } from "react-bootstrap";
function Cars() {
  const [source, setSource] = useState('');
  const [cars, setCars] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sourceFromQuery = searchParams.get("source");

    if (sourceFromQuery) {
      setSource(sourceFromQuery);

      axios.get(`http://localhost:9191/car/get/availablecars/${sourceFromQuery}`)
        .then(response => setCars(response.data))
        .catch(error => console.error('Error fetching available cars:', error));
    }
  }, [location.search]);
const bookcar = () => {
  console.log("checking login");
  if(!localStorage.getItem('isLoggedIn') ){
    console.log("not logged in");
    // localStorage.setItem('url','/customer/bookcar')
    navigate('/auth/login')
    // localStorage.setItem('url','/customer/bookcar')
 }
 else{
return navigate('/customer/bookcar')
 }
}
  return (
    <div>
      <div>
        <NavbarComponent />
        <h3 style={{ color: "Green", fontWeight: "bold" }}> Available Cars</h3>
      </div>
      <div className="row" style={{ paddingLeft: "56px" }}>
        {cars.map((p, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Card
              style={{
                width: "25rem",
                height: "15rem",
                padding: "1px",
                borderColor: "darkmagenta"
              }}
            >
              <CardBody>
                <CardTitle><h3>{p.carModel}</h3></CardTitle>
                <CardSubtitle style={{ color: "red", textAlign: "center" }}>
                  Rent Price(per day): INR. {p.price}
                </CardSubtitle>
                <br></br>
                <CardText style={{ color: "blue", textAlign: "center", fontWeight: "500" }}>seating:{p.seating}</CardText>
                <CardText style={{ color: "magenta", textAlign: "center", fontWeight: "500" }}>source:{p.source}</CardText>
                <Button  onClick={bookcar}>Book Car</Button>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;