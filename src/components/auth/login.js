import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import NavbarComponent from "../customer/components/navbar";
import backgroundImage from "../../assets/pexels-alexgtacar-1592384.jpg"; 


function Login(){
    const [param] = useSearchParams();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [msg,setMsg] = useState(param.get('msg'));
    const navigate = useNavigate();

    const doLogin=()=>{
        let token = window.btoa(username + ':' + password);
        axios.post('http://localhost:9191/auth/login',{},{
          headers:{
            'Authorization':'Basic '+token
          }
        })
        .then(function (response){
            //handle success
            localStorage.setItem('username',username)
            localStorage.setItem('token',token)
            localStorage.setItem('id',response.data.id)
            localStorage.setItem('isLoggedIn',true)
            alert("login success")
            let role = response.data.role;
          console.log("role",role);
            switch(role){
              case 'Customer':
                navigate('/customer/dashboard')
                break;
              case 'Host':
                navigate('/host/dashboard')
                break;
              case 'Admin':
                navigate('/admin/dashboard')
                break;
              default:
            }
          })
          .catch(function (error){
            //handle error
            setMsg('Invalid Credentials')
          });
            // if(username === 'harry@gmail.com' && password === 'potter@123'){
            //     localStorage.setItem('isLoggedIn',true);
            //     navigate(localStorage.getItem('url'))
            // }
            // else{
            //     setMsg('Invalid Credentials')
            // }
        }
    return(
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh', }}>
      <div style={{ display: "flex"}}>
      {/* <div>
                <NavbarComponent />
            </div>  */}
        <div className="container mt-4" >
  
        <div className="row">
          <div className="col-md-3" ></div>
          <div className="col-md-5" >
            <div className="card" style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
              <br />
                  <h3>Login</h3   >
              
              <div className="card-body" >
                  {msg ?
                        <div className="alert alert-danger"  role="alert">
                          {msg}
                      </div>
                  :''}    
                <div className="row " style={{textAlign: "center"}}>
                  <div className="col-md-6">
                    <label>Enter Username:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input type="email" className="form-control" 
                    onChange={(e)=>setUsername(e.target.value)}/>
                  </div>
                </div>
                <div className="row" style={{textAlign: "center"}}>
                  <div className="col-md-6">
                    <label>Enter Password:</label>
                  </div>
                  <div className="col-md-6">
                    <input type="password" className="form-control" 
                    onChange={(e)=>setPassword(e.target.value)} />
                  </div>
                </div>
  
              </div>
              <div  style={{textAlign: "center"}}>
                  <button className="btn btn-primary" 
                  onClick={()=>doLogin()}>Login</button>
                 
                </div>
                
                <div style={{textAlign:"center"}} className="mt-4">
              <span>Don't have an account?
               
              </span> &nbsp;
              <Link to="/auth/signup" className="button_link">  Sign up</Link>
            </div>
            </div>
            
          </div>
          <div className="col-md-3"></div>
        </div>
  
    </div>
    </div>
    </div>
      )
}
export default Login;