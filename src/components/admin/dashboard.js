import React, { useState, useEffect } from 'react';
import { Accordion, Table, Modal, Button } from 'react-bootstrap';
import AdminNavbar from './navbar';
import axios from 'axios';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Cars');
  const [cars, setCars] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [carDetails, setCarDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch cars
    fetch('http://localhost:9191/car/getall')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));

    // Fetch hosts
    fetch('http://localhost:9191/admin/getall/hosts')
      .then(response => response.json())
      .then(data => setHosts(data))
      .catch(error => console.error('Error fetching hosts:', error));

    // Fetch customers
    fetch('http://localhost:9191/admin/getall/customers')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleViewCars = (hostId) => {
    setLoading(true);

    // Fetch cars by host from the API
    const response = axios.get(`http://localhost:9191/admin/getall/carsbyhost/${hostId}`)
      .then(response => response.data)
      .then(data => {
        setCarDetails(data);
        setShowModal(true);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cars by host:', error);
        setLoading(false);
      });
  };

  const handleViewCustomers = (carId) => {
    setLoading(true);

    // Fetch customers by car from the API
    axios.get(`http://localhost:9191/admin/customers/${carId}`)
      .then(response => response.data)
      .then(data => {
        setCustomerDetails(data);
        setShowModal(true);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching customers by car:', error);
        setLoading(false);
      });
  };

  const handleViewBookings = (customerId) => {
    setLoading(true);

    // Fetch bookings by customer from the API
    axios.get(`http://localhost:9191/customer/bookings/${customerId}`)
      .then(response => response.data)
      .then(data => {
        setBookingDetails(data);
        setShowModal(true);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bookings by customer:', error);
        setLoading(false);
      });
  };

  const handleCloseModal = () => {
    setCarDetails(null);
    setCustomerDetails(null);
    setBookingDetails(null);
    setShowModal(false);
  };

  const renderTable = (data, headers, actionButton) => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
            {actionButton && <th key={actionButton}>{actionButton}</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {headers.map(header => (
                <td key={header}>{item[header]}</td>
              ))}
              {actionButton && (
                <td key={actionButton}>
                  <button onClick={() => {
                    if (actionButton === 'View Cars') {
                      handleViewCars(item.id);
                    } else if (actionButton === 'View Booked Customers') {
                      handleViewCustomers(item.carId);
                    } else if (actionButton === 'View Bookings') {
                      handleViewBookings(item.id);
                    }
                  }}>
                    {actionButton}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      <AdminNavbar />
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h3>View</h3>
        <div style={{ border: '2px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
          <Accordion defaultActiveKey="">
            <Accordion.Item eventKey="0">
              <Accordion.Header onClick={() => setActiveTab('Cars')}>Cars</Accordion.Header>
              <Accordion.Body>
                {activeTab === 'Cars' && renderTable(cars, ['carModel', 'vehicleNo', 'fuelType', 'seating', 'price', 'source'], 'Booked Customers')}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header onClick={() => setActiveTab('Hosts')}>Hosts</Accordion.Header>
              <Accordion.Body>
                {activeTab === 'Hosts' && renderTable(hosts, ['hostName', 'hostEmail', 'hostContact'], 'View Cars')}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header onClick={() => setActiveTab('Customers')}>Customers</Accordion.Header>
              <Accordion.Body>
                {activeTab === 'Customers' && renderTable(customers, ['id', 'name', 'age', 'phoneNo'], 'View Bookings')}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>

      {/* Modal for Car, Customer, and Booking Details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{carDetails ? 'Car Details' : (customerDetails ? 'Customer Details' : 'Booking Details')}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto',overflowX: 'auto' }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            carDetails ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Car Model</th>
                    <th>Vehicle No</th>
                    <th>Seating</th>
                    <th>Price</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {carDetails.map((car, index) => (
                    <tr key={index}>
                      <td>{car.carModel}</td>
                      <td>{car.vehicleNo}</td>
                      <td>{car.seating}</td>
                      <td>{car.price}</td>
                      <td>{car.source}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              customerDetails ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>Price</th>
                      <th>Source</th>
                      <th>Destination</th>
                      <th>Customer Name</th>
                      <th>Customer Email</th>
                      <th>Customer PhoneNo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerDetails.map((customer, index) => (
                      <tr key={index}>
                        <td>{customer.fromDate}</td>
                        <td>{customer.toDate}</td>
                        <td>{customer.price}</td>
                        <td>{customer.source}</td>
                        <td>{customer.destination}</td>
                        <td>{customer.customer.name}</td>
                        <td>{customer.customer.age}</td>
                        <td>{customer.customer.phoneNo}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                bookingDetails && (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Price</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Car Model</th>
                        <th>Vehicle No</th>
                        <th>Fuel Type</th>
                        <th>Seating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingDetails.map((booking, index) => (
                        <tr key={index}>
                          <td>{booking.fromDate}</td>
                          <td>{booking.toDate}</td>
                          <td>{booking.price}</td>
                          <td>{booking.source}</td>
                          <td>{booking.destination}</td>
                          <td>{booking.car.carModel}</td>
                          <td>{booking.car.vehicleNo}</td>
                          <td>{booking.car.fuelType}</td>
                          <td>{booking.car.seating}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )
              )
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
