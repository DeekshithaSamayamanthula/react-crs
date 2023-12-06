// Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";



const Profile = () => {
    const navigate = useNavigate();
  const { cid } = useParams();
  const [customer, setCustomer] = useState({
    name: "",
    age: "",
    phoneNo: "",
    email: "", // Added email field
  });

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        console.log("Fetching customer details for cid:", cid);
        const response = await axios.get(`http://localhost:9191/customer/getone/126`);
        console.log("Fetched customer details:", response.data);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerDetails();
  }, [cid]);

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:9191/customer/update/126`, customer);
      alert("Customer details updated successfully!");
      navigate('/customer/dashboard')
    } catch (error) {
      console.error('Error updating customer details:', error);
    }
  };

  return (
    
      

    <Container >
      <h3 style={{ textAlign: "center" }}>Edit Profile</h3>
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "400px", // Set a maximum width if needed
          margin: "0 auto", // Center the container horizontally
        }}
        onSubmit={handleSubmit}
        className="mx-auto"
      >
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label style={{ fontWeight: "bold" }}>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            className="mx-auto"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAge">
          <Form.Label style={{ fontWeight: "bold" }}>Age</Form.Label>
          <Form.Control
            type="text"
            name="age"
            value={customer.age}
            onChange={handleChange}
            className="mx-auto"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label style={{ fontWeight: "bold" }}>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNo"
            value={customer.phoneNo}
            onChange={handleChange}
            className="mx-auto"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            readOnly
            disabled
            className="mx-auto"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </Container>
   
  );
};

export default Profile;
