// BookingHistory.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HostNavbar from "./navbar";

const MyCars = ({ customerId }) => {
    const [myCars, setMyCars] = useState([]);

    useEffect(() => {
        const uid = localStorage.getItem("id");
        const hid = parseInt(uid,10) + 1;
        
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:9191/car/getall/` +hid);
                setMyCars(response.data);
                console.log("response.data",response.data);
            } catch (error) {
                console.error('Error fetching booking history:', error);
            }
        };

        fetchBookings();
    }, [customerId]);

    return (
        <div>
            <div>
                <HostNavbar />
            </div>
            <h3 style={{ color: "Green", fontWeight: "bold" }}>My Cars</h3>
           
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Car Model</th>
                        <th>VehicleNo</th>
                        <th>Rent Price</th>
                        <th>Source</th>
                        <th>Fuel Type</th>
                        <th>Seating</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {myCars.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.carModel}</td>
                            <td>{booking.vehicleNo}</td>
                            <td>INR. {booking.price}</td>
                            <td>{booking.source}</td>
                            <td>{booking.fuelType}</td>
                            <td>{booking.seating}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default MyCars;
