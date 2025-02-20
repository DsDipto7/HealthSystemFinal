import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import './Payment.css';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId, amount, orderDetails } = location.state || {};

    const [selectedPayment, setSelectedPayment] = useState('');

    const handlePaymentMethodSelect = (method) => {
        setSelectedPayment(method);
    };

    const handlePaymentSubmit = async () => {
        if (!selectedPayment) {
            toast.error('Please select a payment method');
            return;
        }

        try {
            // Here you'll integrate with your payment gateway
            // For now, let's simulate a payment process
            toast.info('Processing payment...');
            
            // Simulated payment success
            setTimeout(() => {
                toast.success('Payment successful!');
                navigate('/order-confirmation', { 
                    state: { 
                        orderId,
                        paymentMethod: selectedPayment 
                    }
                });
            }, 2000);

        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Payment failed. Please try again.');
        }
    };

    return (
        <div className="payment-container">
            <ToastContainer />
            <h2>Select Payment Method</h2>
            
            <div className="order-summary">
                <h3>Order Summary</h3>
                <p>Order ID: {orderId}</p>
                <p>Total Amount: ৳{amount}</p>
            </div>

            <div className="payment-methods">
                <div 
                    className={`payment-method ${selectedPayment === 'sslcommerz' ? 'selected' : ''}`}
                    onClick={() => handlePaymentMethodSelect('sslcommerz')}
                >
                    <img src="/path-to-sslcommerz-logo.png" alt="SSLCommerz" />
                    <span>SSLCommerz</span>
                </div>

                <div 
                    className={`payment-method ${selectedPayment === 'stripe' ? 'selected' : ''}`}
                    onClick={() => handlePaymentMethodSelect('stripe')}
                >
                    <img src="/path-to-stripe-logo.png" alt="Stripe" />
                    <span>Stripe</span>
                </div>
            </div>

            <button 
                className="proceed-payment-btn"
                onClick={handlePaymentSubmit}
                disabled={!selectedPayment}
            >
                Proceed with Payment
            </button>
        </div>
    );
};

export default Payment; 