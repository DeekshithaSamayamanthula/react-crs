import { useEffect, useState } from "react";
import axios from "axios";
import NavbarComponent from "./navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "react-bootstrap";

function Cars() {
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [fromDate, setfromDate] = useState("");
    const [toDate, settoDate] = useState("");
    const [carId, setCarId] = useState('');
    const [cars, setCars] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve values from the URL parameters when the component mounts
        const searchParams = new URLSearchParams(location.search);
        const sourceFromQuery = searchParams.get("source");
        const carIdFromQuery = searchParams.get("carId");
        const destinationFromQuery = searchParams.get("destination");
        const fromDateFromQuery = searchParams.get("fromDate");
        const toDateFromQuery = searchParams.get("toDate");

        // Check if source and carId are present in the URL
        if (sourceFromQuery && carIdFromQuery) {
            // Set state variables with values from the URL
            setSource(sourceFromQuery);
            setCarId(carIdFromQuery);
            setDestination(destinationFromQuery);
            setfromDate(fromDateFromQuery);
            settoDate(toDateFromQuery);

            // Fetch available cars based on the source
            axios.get(`http://localhost:9191/car/get/availablecars/${sourceFromQuery}`)
                .then(response => setCars(response.data))
                .catch(error => console.error('Error fetching available cars:', error));
        }
    }, [location.search]);

    const handleBookCar = () => {
      const customerId = localStorage.getItem('customerId');
  
      if (!customerId) {
          console.error('Customer ID not found in localStorage');
          // Handle the absence of customerId as needed
          
      }
  
      // Create booking details object with values from the state
      const bookingDetails = [{
          source: source.trim(),
          destination: destination.trim(),
          fromDate: fromDate.trim(),
          toDate: toDate.trim()
      }];
  console.log("bookingDetails",bookingDetails);
      // Make a POST request to book the car with customerId, carId, and bookingDetails
      axios.post(`http://localhost:9191/bookcar/124/${carId}`, bookingDetails)
          .then(response => {
              console.log('Booking successful:', response.data);
              alert("Booking success");
          })
          .catch(error => {
              console.error('Error booking the car:', error);
              // Handle the error as needed
          });
  }

    return (
        <div>
            <NavbarComponent />
            <h3 style={{ color: "Green", fontWeight: "bold" }}> Available Cars</h3>
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
                                <Button onClick={handleBookCar}>Book Car</Button>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cars;
