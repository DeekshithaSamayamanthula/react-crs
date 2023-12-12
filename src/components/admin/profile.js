import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

class AdminProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: {
        adminName: "",
        phoneNo: "",
        email: "",
      },
    };
  }

  componentDidMount() {
    const uid = localStorage.getItem("id");
    const aid = parseInt(uid, 10) + 1;
    this.fetchAdminDetails(aid);
  }

  fetchAdminDetails = async (aid) => {
    try {
      console.log("Fetching admin details for aid:", aid);
      const response = await axios.get(`http://localhost:9191/admin/getone/${aid}`);
      console.log("Fetched admin details:", response.data);
      this.setState({ admin: response.data });
    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      admin: {
        ...prevState.admin,
        [name]: value,
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("id");
    const aid = parseInt(uid, 10) + 1;
    try {
      await axios.put(`http://localhost:9191/admin/update/${aid}`, this.state.admin);
      alert("Admin details updated successfully!");
      this.props.history.push("/admin/dashboard");
    } catch (error) {
      console.error("Error updating admin details:", error);
    }
  };

  render() {
    const { admin } = this.state;

    return (
      <Container>
        <h3 style={{ textAlign: "center" }}>Edit Profile</h3>
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "400px",
            margin: "0 auto",
          }}
          onSubmit={this.handleSubmit}
          className="mx-auto"
        >
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label style={{ fontWeight: "bold" }}>Name</Form.Label>
            <Form.Control
              type="text"
              name="adminName"
              value={admin.adminName}
              onChange={this.handleChange}
              className="mx-auto"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label style={{ fontWeight: "bold" }}>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNo"
              value={admin.phoneNo}
              onChange={this.handleChange}
              className="mx-auto"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={admin.email}
              onChange={this.handleChange}
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
  }
}

export default AdminProfile;
