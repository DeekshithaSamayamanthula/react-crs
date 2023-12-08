// MyCars.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import HostNavbar from "./navbar";

const MyCars = ({ customerId }) => {
    const [myCars, setMyCars] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [editedCar, setEditedCar] = useState({
        carModel: "",
        fuelType: "",
        seating: "",
        vehicleNo: "",
        source: "",
        price: "",
    });
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const uid = localStorage.getItem("id");
        const hid = parseInt(uid, 10) + 1;

        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:9191/car/getall/` + hid);
                setMyCars(response.data);
            } catch (error) {
                console.error('Error fetching booking history:', error);
            }
        };

        fetchBookings();
    }, [customerId]);

    const handleEdit = (carId) => {
        const carToEdit = myCars.find((car) => car.carId === carId);
        setSelectedCar(carToEdit);
        setEditedCar({
            carModel: carToEdit.carModel,
            fuelType: carToEdit.fuelType,
            seating: carToEdit.seating,
            vehicleNo: carToEdit.vehicleNo,
            source: carToEdit.source,
            price: carToEdit.price,
        });
        setShowEditModal(true);
    };

    const handleModalClose = () => {
        setShowEditModal(false);
        setShowViewModal(false);
        setShowDeleteModal(false);
        setSelectedCar(null);
        setEditedCar({
            carModel: "",
            fuelType: "",
            seating: "",
            vehicleNo: "",
            source: "",
            price: "",
        });
    };

    const handleModalSubmit = async () => {
        try {
            const uid = localStorage.getItem("id");
            const hid = parseInt(uid, 10) + 1;

            const updatedCar = {
                ...editedCar,
                source: editedCar.source,
                price: editedCar.price,
            };

            await axios.put(`http://localhost:9191/car/update/${hid}/${selectedCar.carId}`, updatedCar);

            console.log(`Car with ID ${selectedCar.carId} updated successfully`);

            handleModalClose();
            window.location.reload();
        } catch (error) {
            console.error(`Error updating car with ID ${selectedCar.carId}:`, error);
        }
    };

    const handleDelete = (carId) => {
        const carToDelete = myCars.find((car) => car.carId === carId);
        setSelectedCar(carToDelete);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const uid = localStorage.getItem("id");
            const hid = parseInt(uid, 10) + 1;

            await axios.delete(`http://localhost:9191/host/delete/${hid}/${selectedCar.carId}`);

            console.log(`Car with ID ${selectedCar.carId} deleted successfully`);

            setShowDeleteModal(false);
            window.location.reload();
        } catch (error) {
            console.error(`Error deleting car with ID ${selectedCar.carId}:`, error);
        }
    };

    const handleViewBookings = async (carId) => {
        try {
            const uid = localStorage.getItem("id");
            const hid = parseInt(uid, 10) + 1;

            const response = await axios.get(`http://localhost:9191/host/customers/${hid}/${carId}`);
            if (response.data[0]?.customer) {
                setBookingDetails(response.data);
                console.log("customer bookings:", response.data);
                setShowViewModal(true);
            } else {
                // Display an alert when customer details are not available
                alert("No Bookings yet");
            }
        } catch (error) {
            console.error(`Error fetching bookings for car with ID ${carId}:`, error);
            // Display an alert when bookings are not available
            alert("Bookings are not available");
        }
    };

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
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View Bookings</th>
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
                            <td>
                                <Link to="#" onClick={() => handleEdit(booking.carId)}>
                                    <FaEdit />
                                </Link>
                            </td>
                            <td>
                                <Link to="#" onClick={() => handleDelete(booking.carId)}>
                                    <FaTrash />
                                </Link>
                            </td>
                            <td>
                                <Button variant="info" onClick={() => handleViewBookings(booking.carId)}>
                                    View Bookings
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Car Modal */}
            <Modal show={showEditModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Car Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCarModel">
                            <Form.Label>Car Model</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly
                                disabled
                                placeholder="Enter Car Model"
                                value={editedCar.carModel}
                                onChange={(e) => setEditedCar({ ...editedCar, carModel: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFuelType">
                            <Form.Label>Fuel Type</Form.Label>
                            <Form.Control
                                type="text" readOnly disabled
                                placeholder="Enter Fuel Type"
                                value={editedCar.fuelType}
                                onChange={(e) => setEditedCar({ ...editedCar, fuelType: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSeating">
                            <Form.Label>Seating</Form.Label>
                            <Form.Control
                                type="text" readOnly disabled
                                placeholder="Enter Seating"
                                value={editedCar.seating}
                                onChange={(e) => setEditedCar({ ...editedCar, seating: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formVehicleNo">
                            <Form.Label>Vehicle No</Form.Label>
                            <Form.Control
                                type="text" readOnly disabled
                                placeholder="Enter Vehicle No"
                                value={editedCar.vehicleNo}
                                onChange={(e) => setEditedCar({ ...editedCar, vehicleNo: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSourceCity">
                            <Form.Label>Source City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Source"
                                value={editedCar.source}
                                onChange={(e) => setEditedCar({ ...editedCar, source: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Price"
                                value={editedCar.price}
                                onChange={(e) => setEditedCar({ ...editedCar, price: e.target.value })}
                            />
                        </Form.Group>
                        </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleModalSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* View Bookings Modal */}
            <Modal show={showViewModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {bookingDetails && (
                        <div>
                            <h5>Customer Details:</h5>
                            <p>Name: {bookingDetails[0].customer.name}</p>
                            <p>Email: {bookingDetails[0].customer.email}</p>
                            <p>Age: {bookingDetails[0].customer.age}</p>
                            <p>Phone No: {bookingDetails[0].customer.phoneNo}</p>

                            <h5>Booking Details:</h5>
                            <p>Car Model: {bookingDetails[0].car.carModel}</p>
                            <p>Price: {bookingDetails[0].price}</p>
                            <p>Fuel Type: {bookingDetails[0].car.fuelType}</p>
                            <p>Seating: {bookingDetails[0].car.seating}</p>
                            <p>Vehicle No: {bookingDetails[0].car.vehicleNo}</p>
                            <p>Source: {bookingDetails[0].source}</p>
                            <p>Destination: {bookingDetails[0].destination}</p>
                            <p>From Date: {bookingDetails[0].fromDate}</p>
                            <p>To Date: {bookingDetails[0].toDate}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Car</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete the car?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MyCars;
