import { useEffect } from "react";
import NavbarComponent from "./customer/components/navbar";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "react-bootstrap";



function SearchCars(){
    // function Cars() {
        const [source, setSource] = useState('');
        const [cars, setCars] = useState([]);
        const location = useLocation();
      
        useEffect(() => {
            const searchParams = new URLSearchParams(location.search);
            const sourceFromQuery = searchParams.get("source");
        
            if (sourceFromQuery) {
              setSource(sourceFromQuery);
        
              // Make API call to fetch cars based on the source
              axios.get(`http://localhost:9191/car/getcars/bysource/${sourceFromQuery}`)
                .then(response => setCars(response.data))
                .catch(error => console.error('Error fetching cars by source:', error));
            }
          }, [location.search]);
      
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
                      <Button as={Link} to="/customer/bookcar">Book Car</Button>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        );
      }
      
// }
export default SearchCars;