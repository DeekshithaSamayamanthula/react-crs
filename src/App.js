// import logo from './logo.svg';
import './App.css';
import AdminDashboard from './components/admin/dashboard';
import SearchCars from './components/all';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Signup from './components/auth/signup';

import Cars from './components/customer/components/cars';
import CustomerDashboard from './components/customer/components/dashboard';
import Help from './components/customer/components/help';
import History from './components/customer/components/history';
import NavbarComponent from './components/customer/components/navbar';
import Profile from './components/customer/components/profile';
import SidebarComponent from './components/customer/components/sidebar';
import Sidebar from './components/customer/components/sidebar';
import Success from './components/customer/components/success';
import Home from './components/home';
import HostDashboard from './components/host/dashboard';
import { Route, Routes } from 'react-router-dom';
import HostNavbar from './components/host/navbar';
import HostSignup from './components/host/auth/signup';
import MyCars from './components/host/mycars';
import HostProfile from './components/host/update_profile';
import AdminNavbar from './components/admin/navbar';
import AdminSignup from './components/admin/auth/signup';
import AdminProfile from './components/admin/profile';

function App() {
  return (
    <div className="App">
    <Routes>
      {/* <Route path="/" element={<NavbarComponent />}></Route> */}
      <Route path="/" element={<Home />}></Route>
      <Route path="/all" element={<SearchCars />}></Route>
      <Route path="/customer/dashboard" element={<CustomerDashboard />}></Route>
      {/* <Route path="/host/dashboard" element={<HostDashboard />}></Route> */}
      <Route path="/host/dashboard" element={<HostDashboard />}></Route>
      <Route path="/customer/sidebar" element={<SidebarComponent />}></Route>
      <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
      <Route path="/auth/login" element={<Login />}></Route>
      <Route path="/auth/signup" element={<Signup />}></Route>
      <Route path="/auth/logout" element={<Logout />}></Route>
      <Route path="/customer/cars" element={<Cars />}></Route>
      <Route path="/customer/history" element={<History />}></Route>
      <Route path="/customer/success" element={<Success />}></Route>
      <Route path="/customer/profile" element={<Profile />}></Route>
      <Route path="/help" element={<Help />}></Route>
      <Route path="/host/navbar" element={<HostNavbar />}></Route>
      <Route path="/host/auth/signup" element={<HostSignup />}></Route>
      <Route path="/host/mycars" element={<MyCars />}></Route>
      <Route path="/host/update_profile" element={<HostProfile />}></Route>
      <Route path="/admin/navbar" element={<AdminNavbar />}></Route>
      <Route path="/admin/auth/signup" element={<AdminSignup />}></Route>
      <Route path="/admin/profile" element={<AdminProfile />}></Route>

    </Routes>
</div>
  );
}

export default App;
