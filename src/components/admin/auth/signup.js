import axios from "axios";
import { useState } from "react";

import { useNavigate } from "react-router";

import { Link } from "react-router-dom";


function AdminSignup() {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [admin, setAdmin] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const checkUniqueEmail = async () => {
    try {
      // Check for unique email
      const response = await axios.get(`http://localhost:9191/customer/check-unique-email?email=${email}`);
      return response.data.isUnique; // Assuming the server responds with a property "isUnique"
    } catch (error) {
      console.error("Error checking email uniqueness:", error);
      return false; // Assume non-unique in case of an error
    }
  };

  

  const doSignUp = async () => {
    // Perform basic validations
    if (!name || !phoneNo || !username || !email || !password) {
      setMsg("Please fill in all the fields");
      return;
    }

    if (phoneNo.length !== 10 ) {
      setMsg("Please enter a valid phone number");
      return;
    }

    // Email validation using a simple regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setMsg("Please enter a valid email address");
        return;
    }

    // Password validation
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        setMsg("Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character");
        return;
    }

 
   
    let adminObj = {
      "name": name,
      
      "phoneNo": phoneNo,
      "email": email,
      "user": {
        "username": username,
        "password": password
      }
    };

    axios.post('http://localhost:9191/admin/signup', adminObj)
      .then(response => {
        setAdmin(response.data);
        navigate('/auth/login?msg="signup success"');
      })
      .catch(function (error) {
        setMsg("Issue in processing sign up..");
      });
  };

  return (
    <div>
    <div style={{ display: "flex"}}>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card" style={{ borderRadius: "20px" }}>
              <h3>Create an account</h3>
              <div className="card-body">
                {msg !== "" && (
                  <div className="alert alert-danger" role="alert">
                    {msg}
                  </div>
                )}
                <div className="row " style={{ textAlign: "center" }}>
                  <div className="col-md-6">
                    <label>Enter Name:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                 

                  <div className="col-md-6">
                    <label>Enter Phone No:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Enter email:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <hr />
                  <div className="col-md-6">
                    <label>Enter Username:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="email"
                      className="form-control"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row" style={{ textAlign: "center" }}>
                  <div className="col-md-6">
                    <label>Enter Password:</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer" style={{ textAlign: "center" }}>
                <button className="btn btn-primary" onClick={() => doSignUp()}>
                  SignUp
                </button>
              </div>
              <div style={{ textAlign: "center" }} className="mt-4">
              <span>Have an Account?</span>
            </div>
            <Link to="/auth/login" className="button_link">Login</Link>
            </div>
           
            
            
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AdminSignup;