import './App.css';
import Homepage from './Components/Homepage/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import About from './Components/About/About';
import Product from './Components/Product/Product'
import Adminlogin from './Components/Admin/loginadmin';
import Adminregister from './Components/Admin/registeradmin';
import AdminDashboard from './Components/AdminDashboard/Adminpage';
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword"; // Adjust path if necessary
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import SetPassword from "./Components/SetPassword/SetPassword";



 // Import PrivateRoute
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Example of checking if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('accessToken'); // You can replace this with your authentication logic

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/forget_password" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/setpassword" element={<SetPassword />} />
   

      {/* admin er   jonno  */}
        <Route path="/loginadmin" element={<Adminlogin />} />
        <Route path="/registeradmin" element={<Adminregister />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        {/* Protected Route - Wrapped in PrivateRoute */}
        
      </Routes>
    </Router>
  );
}

export default App;
