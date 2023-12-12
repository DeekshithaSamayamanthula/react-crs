import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComponent from "./navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Form, FormGroup, FormControl, Container, Row, Col, Pagination } from "react-bootstrap";

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
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 3;
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
            return actualPrice * 1.3;
        } else if (noOfDays >= 3 && noOfDays <= 4) {
            return actualPrice * 1.5;
        } else if (noOfDays >= 5 && noOfDays <= 10) {
            return actualPrice * 1.7;
        } else {
            return actualPrice * 1.6;
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
        const uid = localStorage.getItem("id");
        const cid = parseInt(uid, 10) + 1;

        if (!cid) {
            console.error('Customer ID not found in localStorage');
            navigate('/auth/login');
        }

        const bookingDetails = [{
            source: source.trim(),
            destination: destination.trim(),
            fromDate: fromDate.trim(),
            toDate: toDate.trim()
        }];

        axios.post(`http://localhost:9191/bookcar/${cid}/${carId}`, bookingDetails)
            .then(response => {
                console.log('Booking successful:', response.data);
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

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <NavbarComponent />
            
                {selectedCar ? (
                  
                        <Col  md={4} className="mx-auto">
                            <div style={{ border: "1px solid darkmagenta", padding: "15px", borderRadius: "10px" }}>
                                <h4 style={{ fontWeight: "bold" }}>Selected Car Details</h4>
                                <Form className="mx-auto w-50">
                                    <FormGroup >
                                        <label style={{ fontWeight: "bold" }}>Car Model:</label>
                                        <FormControl type="text" value={selectedCar.carModel} readOnly />
                                    </FormGroup>
                                    <FormGroup>
                                        <label style={{ fontWeight: "bold" }}>Fuel Type:</label>
                                        <FormControl type="text" value={selectedCar.fuelType} readOnly />
                                    </FormGroup>
                                    <FormGroup>
                                        <label style={{ fontWeight: "bold" }}>Vehicle No:</label>
                                        <FormControl type="text" value={selectedCar.vehicleNo} readOnly />
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
                                    
                                    <div className="d-flex justify-content-between">
                <Button onClick={handleBack} className="text-left">Back to See Available Cars</Button>&nbsp;
                <Button onClick={handleBookCar} className="text-right">Book Car</Button>
            </div>
                                </Form>
                            </div>
                        </Col>
                   
                ) : (
                    <>
                        <Row >
                            <h3 style={{ color: "Green", fontWeight: "bold", textAlign: "center" }}> Available Cars</h3>
                            {currentCars.map((p, index) => (
                               
                                   <div>
                                   <>
                <Card className="col-lg" style={{ backgroundColor: "", padding: '8px', width: '60%', minWidth: '300px', margin: 'auto' }}>
  <CardBody style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ textAlign: "left", flex: 1 }}>
      <CardTitle style={{ color: "", textAlign: "left" }}><h3>{p.carModel}</h3></CardTitle>
    </div>
    <div style={{ textAlign: "center", flex: 1 }}>
      <CardText style={{ color: "black", fontWeight: "500" }}>Vehicle No: {p.vehicleNo}</CardText>
      <CardText style={{ color: "", fontWeight: "500" }}>Seating: {p.seating}</CardText>
      <CardText style={{ color: "", fontWeight: "500" }}>Source: {p.source}</CardText>
    </div>
    <div style={{ textAlign: "right", flex: 1 }}>
      <CardText style={{ color: "", fontWeight: "500"  }}>Rent Price(per day): INR. {p.price}</CardText>
      <CardText style={{ color: "", fontWeight: "500" }}>Fuel Type: {p.fuelType}</CardText>
      <Button onClick={() => handleSelectCar(p)}>Select Car</Button>
    </div>
  </CardBody>
</Card>

  &nbsp;
</>
</div>
                               
                            ))}
                        </Row>

                        <Pagination className="justify-content-center">
                            {[...Array(Math.ceil(cars.length / carsPerPage)).keys()].map((number) => (
                                <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                                    {number + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </>
                )}
           
        </div>
    );
}

export default Cars;
