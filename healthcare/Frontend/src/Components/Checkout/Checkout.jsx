//pass order details to paymenthomepage
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = location.state || {
    cartItems: [],
    totalPrice: 0,
  };

  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    phone_number: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderResponse = await axios.post(
        "http://127.0.0.1:8000/api/order/place/",
        {
          ...formData,
          total_price: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (orderResponse.data) {
        toast.success("Order information saved! Redirecting to payment...");
        const orderId = orderResponse.data.id;

        setTimeout(() => {
          navigate("/payment", {
            state: {
              orderId: orderId,
              amount: totalPrice,
              orderDetails: {
                items: cartItems.map((item) => ({
                  name: item.productName,
                  price: item.productPrice,
                  quantity: item.quantity,
                })),
                customerInfo: formData,
              },
            },
          });
        }, 1500);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(
        error.response?.data?.error ||
          "Failed to place order. Please try again."
      );
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <ToastContainer />
        <h2>Checkout</h2>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.productName}</span>
              <span>
                {item.quantity} x ৳{item.productPrice}
              </span>
              <span>৳{(item.quantity * item.productPrice).toFixed(2)}</span>
            </div>
          ))}
          <div className="total">
            <strong>Total: ৳{totalPrice}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
