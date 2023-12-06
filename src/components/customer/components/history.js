// BookingHistory.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const History = ({ customerId }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:9191/customer/bookings/124`);
                setBookings(response.data);
                console.log("response.data",response.data);
            } catch (error) {
                console.error('Error fetching booking history:', error);
            }
        };

        fetchBookings();
    }, [customerId]);

    return (
        <div>
            <h3 style={{ color: "Green", fontWeight: "bold" }}>Booking History</h3>
            <Link to="/">Back to Home</Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Car Model</th>
                        <th>Rent Price</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>FromDate</th>
                        <th>ToDate</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.car.carModel}</td>
                            <td>INR. {booking.price}</td>
                            <td>{booking.source}</td>
                            <td>{booking.destination}</td>
                            <td>{booking.fromDate}</td>
                            <td>{booking.toDate}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default History;
