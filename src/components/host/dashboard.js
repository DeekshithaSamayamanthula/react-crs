import HostNavbar from "./navbar";
import './css/dashboard.css';
import { Button, Col, Form, FormControl, InputGroup, Row, Alert } from "react-bootstrap";
import hostImage from '../../assets/hostimage.jpg'; // Adjust the path accordingly
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HostDashboard() {
    const [carModel, setCarmodel] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');
    const [price, setPrice] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [seating, setSeating] = useState('');
    const [source, setSource] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const navigate = useNavigate();

    const handlePostCar = async () => {
        // Validate input fields
        if (!carModel || !vehicleNo || !price || !fuelType || !seating || !source) {
            setWarningMessage("Please fill in all the fields");
            return;
        } else {
            setWarningMessage(""); // Clear any previous warning message
        }

        // Check for unique vehicle number
        const isVehicleNumberUnique = await checkUniqueVehicleNumber(vehicleNo);
        if (!isVehicleNumberUnique) {
            setWarningMessage("Vehicle number already exists. Please use a different one.");
            return;
        } else {
            setWarningMessage(""); // Clear any previous warning message
        }

        // Additional validations can be added based on your requirements, e.g., checking if the price is a valid number.

        // const customerId = localStorage.getItem('id');
        const uid = localStorage.getItem("id");
        const hid = parseInt(uid, 10) + 1;

        if (!hid) {
            console.error('Host ID not found in localStorage');
            // Handle the absence of customerId as needed
            navigate('/auth/login');
        }

        // Create booking details object with values from the state
        const postcarDetails = {
            carModel: carModel.trim(),
            vehicleNo: vehicleNo.trim(),
            price: price.trim(),
            fuelType: fuelType.trim(),
            seating: seating.trim(),
            source: source.trim()
        };

        // Make a POST request to book the car with customerId, carId, and bookingDetails
        axios.post(`http://localhost:9191/car/post/${hid}`, postcarDetails)
            .then(response => {
                console.log('Posted Car successful:', response.data);
                alert("Car added successfully");
                navigate(`/host/mycars`);
            })
            .catch(error => {
                console.error('Error posting the car:', error);
                // Handle the error as needed
            });
    };

    const checkUniqueVehicleNumber = async (vehicleNumber) => {
        try {
            const response = await axios.get(`http://localhost:9191/car/checkUniqueVehicleNumber/${vehicleNumber}`);
            return response.data.isUnique;
        } catch (error) {
            console.error('Error checking vehicle number uniqueness:', error);
            // Handle the error as needed
            return false;
        }
    };

    return (
        <div style={{ backgroundImage: `url(${hostImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '100vh' }}>
            <div>
                <HostNavbar />
            </div>

            <br />
            <br />
            <br />
            <br />
            <div>
                <Form className="col-lg-12" style={{ backgroundColor: "#1C1C1C", opacity: "0.8", padding: '8px', width: '60%', minWidth: '300px', margin: 'auto' }}>
                    <div style={{ color: 'white' }}><h3>Give your car details</h3></div>
                    <Row style={{ padding: '18px' }}>
                        <Col md={4}>
                            <InputGroup className="mb-4">
                                <FormControl
                                    placeholder="Enter Car Model"
                                    value={carModel}
                                    onChange={(e) => setCarmodel(e.target.value)}
                                    style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)', color: "white", fontWeight: "500" }}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <InputGroup className="mb-4">
                                <FormControl
                                    placeholder="Enter Vehicle Number"
                                    value={vehicleNo}
                                    onChange={(e) => setVehicleNo(e.target.value)}
                                    style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)', color: "white", fontWeight: "500" }}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <InputGroup className="mb-4">
                                <FormControl
                                    placeholder="Enter Price(per Day)"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)', color: "white", fontWeight: "500" }}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <InputGroup className="mb-4">
                                <FormControl
                                    placeholder="Enter Fuel Type"
                                    value={fuelType}
                                    onChange={(e) => setFuelType(e.target.value)}
                                    style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)', color: "white", fontWeight: "500" }}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <InputGroup className="mb-4">
                                <FormControl
                                    placeholder="Enter Seating"
                                    value={seating}
                                    onChange={(e) => setSeating(e.target.value)}
                                    style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)', color: "white", fontWeight: "500" }}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <InputGroup className="mb-4">
                                <FormControl
                                    placeholder="Enter Source City"
                                    value={source}
                                    onChange={(e) => setSource(e.target.value)}
                                    style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)', color: "white", fontWeight: "500" }}
                                />
                            </InputGroup>
                        </Col>
                        {warningMessage && <Alert variant="warning">{warningMessage}</Alert>}
                        <Button onClick={handlePostCar}>Post Car</Button>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default HostDashboard;
