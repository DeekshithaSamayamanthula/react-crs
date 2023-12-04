import { useState } from "react";
import NavbarComponent from "./navbar";
import Login from "../../auth/login";
import { Button, Form, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import './dashboard.css';
import Sidebar from "./sidebar";

function CustomerDashboard() {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [cars,setCars] = useState([]);
    const [msg,setMsg] = useState('');
    const [sourceCities, setSourceCities] = useState([]);
    
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
            
        })
        .catch(error => {
            setMsg('Error in Fetching available cars');
            console.error('Error fetching available cars:', error);
        });
}



useEffect(() => {
    // Fetch source and destination options from the database
    axios.get("http://localhost:9191/car/getall")
      .then(response => {
        // Remove duplicate city names
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
        // If ToDate is empty, set it to the selected FromDate
        if (!toDate) {
            setToDate(selectedDate);
        }
    }

    const handleToDateChange = (e) => {
        const selectedDate = e.target.value;
        setToDate(selectedDate);
        // If FromDate is empty, set it to the selected ToDate
        if (!fromDate) {
            setFromDate(selectedDate);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
    }

    return (
        <div>
            
            <div>
               
                {/* <NavbarComponent /> */}
                
                <Sidebar />
               
                
            </div>
            

            <div className="container top-div">
                <div className="row justify-content-center">
                    <div className="col-md-6 border" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderBlockColor:"black"}}>
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
                                        min={getTodayDate()}  // Set the min attribute to the value of Today
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

            <page />
            
        </div>
        
    )
}

export default CustomerDashboard;