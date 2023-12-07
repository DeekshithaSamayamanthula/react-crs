import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComponent from "./navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Form, FormGroup, FormControl, Container, Row, Col } from "react-bootstrap";

function Cars() {
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [fromDate, setfromDate] = useState("");
    const [toDate, settoDate] = useState("");
    const [carId, setCarId] = useState('');
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [noOfDays, setNoOfDays] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const sourceFromQuery = searchParams.get("source");
        const carIdFromQuery = searchParams.get("carId");
        const destinationFromQuery = searchParams.get("destination");
        const fromDateFromQuery = searchParams.get("fromDate");
        const toDateFromQuery = searchParams.get("toDate");

        if (sourceFromQuery && carIdFromQuery) {
            setSource(sourceFromQuery);
            setCarId(carIdFromQuery);
            setDestination(destinationFromQuery);
            setfromDate(fromDateFromQuery);
            settoDate(toDateFromQuery);

            axios.get(`http://localhost:9191/car/get/availablecars/${sourceFromQuery}`)
                .then(response => setCars(response.data))
                .catch(error => console.error('Error fetching available cars:', error));
        }
    }, [location.search]);

    const calculateTotalPrice = (actualPrice, noOfDays) => {
        if (noOfDays <= 1) {
            return actualPrice;
        } else if (noOfDays === 2) {
            return actualPrice * 1.2;
        } else if (noOfDays >= 3 && noOfDays <= 4) {
            return actualPrice * 1.4;
        } else if (noOfDays >= 5 && noOfDays <= 10) {
            return actualPrice * 1.6;
        } else {
            return actualPrice * 1.5;
        }
    };

    useEffect(() => {
        if (selectedCar && fromDate && toDate) {
            const fromDateObj = new Date(fromDate);
            const toDateObj = new Date(toDate);
            const timeDifference = toDateObj.getTime() - fromDateObj.getTime();
            const days = Math.ceil(timeDifference / (1000 * 3600 * 24));
            setNoOfDays(days);

            const totalPrice = calculateTotalPrice(selectedCar.price, days);
            setTotalPrice(totalPrice.toFixed(2)); // Round to two decimal places
        }
    }, [selectedCar, fromDate, toDate]);

    const handleBookCar = () => {
        // const customerId = localStorage.getItem('id');
        const uid = localStorage.getItem("id");
        const cid = parseInt(uid,10) + 1;
        
        if (!cid) {
            console.error('Customer ID not found in localStorage');
            // Handle the absence of customerId as needed
           navigate('/auth/login')
        }
    
        // Create booking details object with values from the state
        const bookingDetails = [{
            source: source.trim(),
            destination: destination.trim(),
            fromDate: fromDate.trim(),
            toDate: toDate.trim()
        }];
        
        // Make a POST request to book the car with customerId, carId, and bookingDetails
        axios.post(`http://localhost:9191/bookcar/${cid}/${carId}`, bookingDetails)
            .then(response => {
                console.log('Booking successful:', response.data);
                alert("Booking success");
                navigate(`/customer/success`);
            })
            .catch(error => {
                console.error('Error booking the car:', error);
                // Handle the error as needed
            });
    }

    const handleBack = () => {
        setSelectedCar(null);
    };

    const handleSelectCar = (car) => {
        setSelectedCar(car);
    }

    return (
        <div>
            <NavbarComponent />
            <Container>
                {selectedCar ? (
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <div style={{ border: "1px solid darkmagenta", padding: "15px", borderRadius: "10px" }}>
                                
                                <h4 style={{ fontWeight: "bold" }}>Selected Car Details</h4>
                                <Form>
                                    <FormGroup>
                                        <label style={{ fontWeight: "bold" }}>Car Model:</label>
                                        <FormControl type="text" value={selectedCar.carModel} readOnly />
                                    </FormGroup>
                                    <FormGroup>
                                        <label style={{ fontWeight: "bold" }}>Rent Price (per day):</label>
                                        <FormControl type="text" value={`INR. ${selectedCar.price}`} readOnly />
                                    </FormGroup>
                                    <FormGroup>
                                        <label style={{ fontWeight: "bold" }}>Seating:</label>
                                        <FormControl type="text" value={selectedCar.seating} readOnly />
                                    </FormGroup>
                                    <FormGroup>
                                        <label style={{ fontWeight: "bold" }}>Source:</label>
                                        <FormControl type="text" value={selectedCar.source} readOnly />
                                    </FormGroup>
                                    <FormGroup>
                                        <label style={{ fontWeight: "bold" }}>Number of Days:</label>
                                        <FormControl type="text" value={noOfDays} readOnly />
                                    </FormGroup>
                                    <FormGroup>
                                        <label style={{ fontWeight: "bold" }}>Total Price:</label>
                                        <FormControl type="text" value={`INR. ${totalPrice || 0}`} readOnly />
                                    </FormGroup>
                                    <br />
                                    
                                    <Button onClick={handleBack} style={{ textAlign: "left" }}>Back to See Available Cars</Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button onClick={handleBookCar} >Book Car</Button>
                                    
                                </Form>
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <Row className="justify-content-center">
                        <h3 style={{ color: "Green", fontWeight: "bold", textAlign: "center" }}> Available Cars</h3>
                        {cars.map((p, index) => (
                            <Col key={index} md={4} className="mb-4">
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
                                        <Button onClick={() => handleSelectCar(p)}>Select Car</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default Cars;
