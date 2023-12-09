import React, { useState, useEffect } from 'react';
import { Accordion, Table } from 'react-bootstrap';
import AdminNavbar from './navbar';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Cars');
  const [cars, setCars] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [customers, setCustomers] = useState([]);

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

  const renderTable = (data, headers) => {
    return (
        
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {headers.map(header => (
                <td key={header}>{item[header]}</td>
              ))}
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
      <h3>View </h3>
      <div style={{ border: '2px solid #ccc', borderRadius: '8px',boxShadow:'0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
        <Accordion defaultActiveKey="">
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={() => setActiveTab('Cars')}>Cars</Accordion.Header>
            <Accordion.Body>
              {activeTab === 'Cars' && renderTable(cars, ['carModel','vehicleNo', 'fuelType', 'seating', 'price', 'source'])}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header onClick={() => setActiveTab('Hosts')}>Hosts</Accordion.Header>
            <Accordion.Body>
              {activeTab === 'Hosts' && renderTable(hosts, ['hostName', 'hostEmail', 'hostContact'])}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header onClick={() => setActiveTab('Customers')}>Customers</Accordion.Header>
            <Accordion.Body>
              {activeTab === 'Customers' && renderTable(customers, ['name','email','age','phoneNo'])}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      
    </div> </div>
  );
}

export default AdminDashboard;
