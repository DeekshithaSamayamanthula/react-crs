// BookingHistory.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "react-bootstrap";

const History = ({ customerId }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:9191/customer/bookings/124`);
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching booking history:', error);
            }
        };

        fetchBookings();
    }, [customerId]);

    return (
        <div>
            <h3 style={{ color: "Green", fontWeight: "bold" }}>Booking History</h3>
            <div className="row" style={{ paddingLeft: "56px" }}>
                {bookings.map((booking, index) => (
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
                                <CardTitle>
                                    <h3>{booking.carModel}</h3>
                                </CardTitle>
                                <CardSubtitle style={{ color: "red", textAlign: "center" }}>
                                    Rent Price: INR. {booking.price}
                                </CardSubtitle>
                                <br></br>
                                <CardText style={{ color: "magenta", textAlign: "center", fontWeight: "500" }}>
                                    Source: {booking.source}
                                </CardText>
                                <CardText style={{ color: "magenta", textAlign: "center", fontWeight: "500" }}>
                                    Destination: {booking.destination}
                                </CardText>
                                <CardText style={{ color: "blue", textAlign: "center", fontWeight: "500" }}>
                                    FromDate: {booking.fromDate}
                                </CardText>
                                <CardText style={{ color: "blue", textAlign: "center", fontWeight: "500" }}>
                                    ToDate: {booking.toDate}
                                </CardText>
                               
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
