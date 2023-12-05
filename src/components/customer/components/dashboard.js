import { useState, useEffect } from "react";
import NavbarComponent from "./navbar";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './dashboard.css';
import Sidebar from "./sidebar";

function CustomerDashboard() {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [cars, setCars] = useState([]);
    const [msg, setMsg] = useState('');
    const [sourceCities, setSourceCities] = useState([]);
    const navigate = useNavigate();

    const handleAvailableCars = () => {
        console.log('Selected Source:', source);

        if (!source) {
            setMsg('Please select a source city');
            return;
        }

        axios.get(`http://localhost:9191/car/get/availablecars/${source.trim()}`)
            .then(response => {
                setCars(response.data);
                console.log('Available Cars:', response.data);

                // Assuming you have customerId and carId available
                const customerId = 123; // Replace with your actual customerId
                const carId = response.data[0].carId; // Assuming you want to book the first available car

                navigate(`/customer/cars?source=${source}&carId=${carId}`);
            })
            .catch(error => {
                setMsg('Error in Fetching available cars');
                console.error('Error fetching available cars:', error);
            });
    }

    useEffect(() => {
        axios.get("http://localhost:9191/car/getall")
            .then(response => {
                const uniqueCities = Array.from(new Set(response.data.map(city => city.source)));
                setSourceCities(uniqueCities);
                console.log("Unique Source Cities:", uniqueCities);
            })
            .catch(error => {
                console.error("Error fetching source data:", error);
            });
    }, []);

    function getTodayDate() {
        const today = new Date();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${today.getFullYear()}-${month}-${day}`;
    }

    const handleFromDateChange = (e) => {
        const selectedDate = e.target.value;
        setFromDate(selectedDate);

        if (!toDate) {
            setToDate(selectedDate);
        }
    }

    const handleToDateChange = (e) => {
        const selectedDate = e.target.value;
        setToDate(selectedDate);

        if (!fromDate) {
            setFromDate(selectedDate);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Your form submission logic if needed
    }

    return (
        <div>
            <div>
                <Sidebar />
            </div>

            <div className="container top-div">
                <div className="row justify-content-center">
                    <div className="col-md-6 border" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderBlockColor: "black" }}>
                        <br />
                        <h3>Search Cars </h3>
                        <br />

                        <form onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label className="col-md-6">Enter Source City:</label>
                                <div className="col-md-6 mb-4">
                                    <Form.Group>
                                        <Form.Control
                                            as="select"
                                            value={source}
                                            onChange={(e) => setSource(e.target.value)}
                                        >
                                            <option value="">Select Source</option>
                                            {sourceCities.map((city, index) => (
                                                <option key={index} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-6">Enter Destination City:</label>
                                <div className="col-md-6 mb-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        placeholder="enter destination"
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-6">Enter FromDate:</label>
                                <div className="col-md-6 mb-4">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={fromDate}
                                        onChange={handleFromDateChange}
                                        min={getTodayDate()}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-6">Enter ToDate:</label>
                                <div className="col-md-6 mb-4">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={toDate}
                                        onChange={handleToDateChange}
                                        min={getTodayDate()}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-6"></div>
                                <div className="col-md-6 mb-4" style={{ textAlign: "center" }}>
                                    <Button as={Link} to={`/customer/cars?source=${source}`} onClick={handleAvailableCars} variant="success">Available Cars</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerDashboard;
