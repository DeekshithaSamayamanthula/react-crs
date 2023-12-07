import HostNavbar from "./navbar";
import './css/dashboard.css';
import { Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import hostImage from '../../assets/hostimage.jpg'; // Adjust the path accordingly

function HostDashboard() {
    

    return (
        <div style={{ backgroundImage: `url(${hostImage})`, backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh', }}>
            <div>
                <HostNavbar />
            </div>

            <br />
            <br />
            <br />
            <br />
        <div>
            <Form className="col-lg-12" style={{backgroundColor:"#1C1C1C",opacity:"0.8",  padding: '8px', width: '60%', minWidth: '300px', margin: 'auto' }}>
                <div style={{ color: 'white' }}><h3>Give your car details</h3></div>
                <Row style={{ padding: '18px' }}>
                    <Col md={4}>
                        <InputGroup className="mb-4">
                            <FormControl
                                placeholder="Enter Car Model"
                                style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)' ,color:"white",fontWeight:"500"}}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <InputGroup className="mb-4">
                            <FormControl
                                placeholder="Enter Vehicle Number"
                                style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)',color:"white",fontWeight:"500" }}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <InputGroup className="mb-4">
                            <FormControl
                                placeholder="Enter Price(per Day)"
                                style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)',color:"white",fontWeight:"500" }}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <InputGroup className="mb-4">
                            <FormControl
                                placeholder="Enter Fuel Type"
                                style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)',color:"white",fontWeight:"500" }}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <InputGroup className="mb-4">
                            <FormControl
                                placeholder="Enter Seating"
                                style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)' ,color:"white",fontWeight:"500"}}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <InputGroup className="mb-4">
                            <FormControl
                                placeholder="Enter Source City"
                                style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)',color:"white",fontWeight:"500" }}
                            />
                        </InputGroup>
                    </Col>
                   <button  type="button" >Submit</button>
                </Row>
            </Form>
            </div>
        </div>
    );
}

export default HostDashboard;
