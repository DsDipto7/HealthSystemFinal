


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Checkout from "./Components/Checkout/Checkout";
import Payment from "./Components/Payment/Payment";
import PrescriptionUpload from "./Components/PrescriptionUpload/PrescriptionUpload";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/upload-prescription" element={<PrescriptionUpload />} />

      </Routes>
    </Router>
  );
};

export default App;