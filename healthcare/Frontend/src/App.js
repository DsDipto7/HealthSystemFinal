//import logo from './logo.svg';
import './App.css';
import Homepage from './Components/Homepage/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import About from "./Components/About/About";
import 'bootstrap/dist/css/bootstrap.min.css';

//import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
