// Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";



const AdminProfile = () => {
    const navigate = useNavigate();
  const { aid } = useParams();
  const [admin, setAdmin] = useState({
    adminName: "",
    
    phoneNo: "",
    email: "", 
  });

  useEffect(() => {
    const uid = localStorage.getItem("id");
    const aid = parseInt(uid,10) + 1;
    const fetchAdminDetails = async () => {
      try {
        console.log("Fetching admin details for aid:", aid);
        const response = await axios.get(`http://localhost:9191/admin/getone/${aid}`);
        console.log("Fetched admin details:", response.data);
        setAdmin(response.data);
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchAdminDetails();
  }, [aid]);

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
      [e.target.phoneNo]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("id");
    const aid = parseInt(uid,10) + 1;
    try {
      await axios.put(`http://localhost:9191/admin/update/${aid}`, admin);
      alert("Admin details updated successfully!");
      navigate('/admin/dashboard')
    } catch (error) {
      console.error('Error updating admin details:', error);
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
    name="adminName" 
    value={admin.adminName}
    onChange={handleChange}
    className="mx-auto"
  />
</Form.Group>

<Form.Group className="mb-3" controlId="formPhone">
  <Form.Label style={{ fontWeight: "bold" }}>Phone Number</Form.Label>
  <Form.Control
    type="text"
    name="phoneNo"  
    value={admin.phoneNo}
    onChange={handleChange}
    className="mx-auto"
  />
</Form.Group>

<Form.Group className="mb-3" controlId="formEmail">
  <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
  <Form.Control
    type="email"
    name="email"  
    value={admin.email}
    onChange={handleChange}
    readOnly
    disabled
    className="mx-auto"
  />
</Form.Group>

        <Button variant="primary" type="submit">
        <FaEdit /> Update Profile
        </Button>
      </Form>
    </Container>
   
  );
};

export default AdminProfile;
