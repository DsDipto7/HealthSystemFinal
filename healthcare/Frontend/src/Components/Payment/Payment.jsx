

//==================================================================================
//2nd  aita te sob thik khali order details pas kore na

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./Payment.css";
import { loadStripe } from "@stripe/stripe-js";
import stripe from "../../assets/stripe.png"; // Adjust the path to your Stripe logo

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract order details safely
  const { orderId, amount, orderDetails = {} } = location.state || {};
  const items = Array.isArray(orderDetails.items) ? orderDetails.items : [];
  const customerInfo = orderDetails.customerInfo || {};

  const [selectedPayment, setSelectedPayment] = useState("");

  const handlePaymentMethodSelect = (method) => {
    setSelectedPayment(method);
  };

  const handlePaymentRedirect = () => {
    navigate("/paymenthomepage", { state: { orderId, amount, orderDetails } });
  };

  const handlePaymentSubmit = async () => {
    if (selectedPayment !== "stripe") {
      toast.error("Please select Stripe for this integration.");
      return;
    }

    try {
      toast.info("Redirecting to payment...");

      const response = await axios.post(
        "http://localhost:8000/payments/create-checkout-session/",
        { amount: amount }
      );

      const stripe = await loadStripe(
        "pk_test_51QvEz9RoqWK389OSXrTxrJPZcVB4dAXWsIihe3gxak8P0R1DKiTQK8BOLZMLGVwEHRp6P8Ebw05R2jTs6cVTgWQw00gwuP9fgd"
      );
      await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="payment-container">
      <ToastContainer />
      <h2>Select Payment Method</h2>

      {/* Order Summary */}
      <div className="order-summary">
        <h3>Order Summary</h3>
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Total Amount:</strong> ৳{amount}</p>

        {/* Render Items Properly */}
        {items.length > 0 ? (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.name} - ৳{item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in the order.</p>
        )}

        {/* Display Customer Info if available */}
        {customerInfo.name && (
          <div>
            <h4>Customer Information:</h4>
            <p><strong>Name:</strong> {customerInfo.name}</p>
            <p><strong>Email:</strong> {customerInfo.email}</p>
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <div className="payment-methods">
        {/* <div
          className={`payment-method ${selectedPayment === "sslcommerz" ? "selected" : ""}`}
          onClick={() => handlePaymentMethodSelect("sslcommerz")}
        >
          <img src="/path-to-sslcommerz-logo.png" alt="SSLCommerz" />
          <span>SSLCommerz</span>
        </div> */}

        <div
          className={`payment-method ${selectedPayment === "stripe" ? "selected" : ""}`}
          onClick={() => handlePaymentMethodSelect("stripe")}
        >
          <img src={stripe} alt="Stripe" />
          {/* <span>Stripe</span> */}
        </div>
      </div>

      {/* Payment Button */}
      <button
        className="proceed-payment-btn"
        onClick={handlePaymentRedirect}
        disabled={!selectedPayment}
      >
        Proceed with Payment
      </button>

{/* Back Button */}
<button
  className="back-button"
  onClick={() => navigate("/")}
  style={{
    backgroundColor: "red",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  }}
>
  Back to Homepage
</button>
      
    </div>
  );
};

export default Payment;





