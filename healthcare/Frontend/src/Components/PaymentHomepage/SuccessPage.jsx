import React from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessPage.css";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <h1>Payment Successful</h1>
      <p>Thank you for your payment. Your transaction was successful.</p>
      <button onClick={() => navigate("/")} className="return-button">
        Return to Home
      </button>
    </div>
  );
};

export default SuccessPage;