import HostNavbar from "./navbar";
import './css/dashboard.css';
import { Button, Col, Form, FormControl, InputGroup, Row, Alert } from "react-bootstrap";
import hostImage from '../../assets/hostimage.jpg';
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
    // Basic validation checks
    if (!carModel || !vehicleNo || !price || !fuelType || !seating || !source) {
      setWarningMessage("Please fill in all the fields");
      return;
    } else {
      setWarningMessage(""); // Clear any previous warning message
    }

    const carModelRegex = /^[A-Za-z0-9\s]+$/;
    if (!carModelRegex.test(carModel)) {
      setWarningMessage("Car model can only contain letters, numbers, and spaces");
      return;
    }
    // Validate vehicle number using regex
    const vehicleNoRegex = /^[A-Za-z0-9\s]+$/;
    if (!vehicleNoRegex.test(vehicleNo)) {
      setWarningMessage("Vehicle number can only contain letters and numbers, and spaces");
      return;
    } else {
      setWarningMessage(""); // Clear any previous warning message
    }

    const uid = localStorage.getItem("id");
    const hid = parseInt(uid, 10) + 1;

    if (!hid) {
      console.error('Host ID not found in localStorage');
      // Handle the absence of customerId as needed
      navigate('/auth/login');
    }

    const postcarDetails = {
      carModel: carModel.trim(),
      vehicleNo: vehicleNo.trim(),
      price: price.trim(),
      fuelType: fuelType.trim(),
      seating: seating.trim(),
      source: source.trim()
    };

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
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)', color: "white", fontWeight: "500" }}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup className="mb-4">
                <Form.Control
                  as="select"
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)', color: "white", fontWeight: "500" }}
                >
                  <option value="">Select Fuel Type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="gas">Gas</option>
                  <option value="electrical">Electrical</option>
                </Form.Control>
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup className="mb-4">
                <FormControl
                  placeholder="Enter Seating"
                  value={seating}
                  type="number"

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
