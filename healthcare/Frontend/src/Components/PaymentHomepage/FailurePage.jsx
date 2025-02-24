import React from "react";
import { useNavigate } from "react-router-dom";
import "./FailurePage.css";

const FailurePage = () => {
  const navigate = useNavigate();

  return (
    <div className="failure-page">
      <h1>Payment Failed</h1>
      <p>Unfortunately, your payment could not be processed.</p>
      <button onClick={() => navigate("/")} className="return-button">
        Try Again
      </button>
    </div>
  );
};

export default FailurePage;