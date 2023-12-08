// BookingHistory.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import delete icon
import HostNavbar from "./navbar";

const MyCars = ({ customerId }) => {
    const [myCars, setMyCars] = useState([]);
    const [showModal, setShowModal] = useState(false);
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

    useEffect(() => {
        const uid = localStorage.getItem("id");
        const hid = parseInt(uid, 10) + 1;

        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:9191/car/getall/` + hid);
                setMyCars(response.data);
                console.log("response.data", response.data);
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
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedCar(null);
        setEditedCar({
            carModel: "",
            fuelType: "",
            seating: "",
            vehicleNo: "",
            source: "",
            price:"",
        });
    };

    const handleModalSubmit = async () => {
        try {
            const uid = localStorage.getItem("id");
            const hid = parseInt(uid, 10) + 1;

            // Update the editedCar object with source and price
            const updatedCar = {
                ...editedCar,
                source: editedCar.source,
                price: editedCar.price,
            };

            // Make the API call to update the car
            await axios.put(`http://localhost:9191/car/update/${hid}/${selectedCar.carId}`, updatedCar);

            // Optionally, you can perform additional actions after a successful update

            console.log(`Car with ID ${selectedCar.carId} updated successfully`);
            
            handleModalClose(); // Close the modal after a successful update
            
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
            // Make the API call to delete the car
            const uid = localStorage.getItem("id");
            const hid = parseInt(uid, 10) + 1;

            await axios.delete(`http://localhost:9191/host/delete/${hid}/${selectedCar.carId}`);

            // Optionally, you can perform additional actions after a successful delete

            console.log(`Car with ID ${selectedCar.carId} deleted successfully`);
            
            setShowDeleteModal(false); // Close the delete confirmation modal
            window.location.reload(); // Reload the page to fetch updated data
        } catch (error) {
            console.error(`Error deleting car with ID ${selectedCar.carId}:`, error);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setSelectedCar(null);
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
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Car Modal */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Car Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCarModel">
                            <Form.Label>Car Model</Form.Label>
                            <Form.Control
                                type="text" readOnly disabled
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

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Car</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete the car?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteCancel}>
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
