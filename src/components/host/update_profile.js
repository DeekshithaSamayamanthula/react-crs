// Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";



const HostProfile = () => {
    const navigate = useNavigate();
  const { hid } = useParams();
  const [host, setHost] = useState({
    hostName: "",
    
    hostContact: "",
    hostEmail: "", 
  });

  useEffect(() => {
    const uid = localStorage.getItem("id");
    const hid = parseInt(uid,10) + 1;
    const fetchHostDetails = async () => {
      try {
        console.log("Fetching host details for hid:", hid);
        const response = await axios.get(`http://localhost:9191/host/getone/${hid}`);
        console.log("Fetched host details:", response.data);
        setHost(response.data);
      } catch (error) {
        console.error('Error fetching host details:', error);
      }
    };

    fetchHostDetails();
  }, [hid]);

  const handleChange = (e) => {
    setHost({
      ...host,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("id");
    const hid = parseInt(uid,10) + 1;
    try {
      await axios.put(`http://localhost:9191/host/update/${hid}`, host);
      alert("Host details updated successfully!");
      navigate('/host/dashboard')
    } catch (error) {
      console.error('Error updating host details:', error);
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
    name="hostName" 
    value={host.hostName}
    onChange={handleChange}
    className="mx-auto"
  />
</Form.Group>

<Form.Group className="mb-3" controlId="formPhone">
  <Form.Label style={{ fontWeight: "bold" }}>Phone Number</Form.Label>
  <Form.Control
    type="text"
    name="hostContact"  
    value={host.hostContact}
    onChange={handleChange}
    className="mx-auto"
  />
</Form.Group>

<Form.Group className="mb-3" controlId="formEmail">
  <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
  <Form.Control
    type="email"
    name="hostEmail"  
    value={host.hostEmail}
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

export default HostProfile;
