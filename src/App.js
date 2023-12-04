// import logo from './logo.svg';
import './App.css';
import AdminDashboard from './components/admin/dashboard';
import SearchCars from './components/all';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Signup from './components/auth/signup';
import BookCar from './components/customer/components/bookcar';
import Cars from './components/customer/components/cars';
import CustomerDashboard from './components/customer/components/dashboard';
import Help from './components/customer/components/help';
import NavbarComponent from './components/customer/components/navbar';
import SidebarComponent from './components/customer/components/sidebar';
import Sidebar from './components/customer/components/sidebar';
import Home from './components/home';
import HostDashboard from './components/host/dashboard';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<NavbarComponent />}></Route>
      <Route path="/home" element={<Home />}></Route>
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
      <Route path="/customer/bookcar" element={<BookCar />}></Route>
      <Route path="/help" element={<Help />}></Route>
    </Routes>
</div>
  );
}

export default App;
