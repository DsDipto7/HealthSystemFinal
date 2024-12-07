import './App.css';
import Homepage from './Components/Homepage/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import About from './Components/About/About';

import Adminlogin from './Components/Admin/loginadmin';
import Adminregister from './Components/Admin/registeradmin';
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
      

      {/* admin er   jonno  */}
        <Route path="/loginadmin" element={<Adminlogin />} />
        <Route path="/registeradmin" element={<Adminregister />} />

        {/* Protected Route - Wrapped in PrivateRoute */}
        
      </Routes>
    </Router>
  );
}

export default App;
