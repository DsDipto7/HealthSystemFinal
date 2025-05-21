// //rcv order details from payment page
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./PaymentHomepage.css";

// const PaymentHomepage = () => {
//   const [loading, setLoading] = useState(false);
//   const [currency, setCurrency] = useState("USD");
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();
//   const hardcodedAmount = 50000000;

//   const location = useLocation();
//   const { orderId, amount, orderDetails = {} } = location.state || {};
//   const items = Array.isArray(orderDetails.items) ? orderDetails.items : [];
//   const customerInfo = orderDetails.customerInfo || {};

//   const handlePayClick = async () => {
//     if (!email.trim()) {
//       alert("Please enter a valid email.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/payments/create-payment-intent/",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             amount: hardcodedAmount,
//             user_email: email.trim(),
//           }),
//         }
//       );

//       const data = await response.json();
//       console.log("Backend Response:", data);

//       if (response.ok && data.clientSecret) {
//         navigate("/paymentforstripe", {
//           state: { clientSecret: data.clientSecret },
//         });
//       } else {
//         alert(
//           "Error creating payment intent: " + (data.error || "Unknown error")
//         );
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error creating payment intent.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>React Stripe Payment</h1>
//       <p>
//         <strong>Order ID:</strong> {orderId || "N/A"}
//       </p>
//       <p>
//         <strong>Amount:</strong>{" "}
//         {amount ? amount.toLocaleString() : hardcodedAmount / 100} {currency}
//       </p>

//       {/* Render Order Details Properly */}
//       <div>
//         <h3>Order Details:</h3>
//         {items.length > 0 ? (
//           <ul>
//             {items.map((item, index) => (
//               <li key={index}>
//                 <strong>{item.name || "Unnamed Item"}</strong> - ৳
//                 {(item.price * item.quantity).toLocaleString()} ({item.quantity}{" "}
//                 x ৳{item.price})
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No items in the order.</p>
//         )}
//       </div>

//       {/* Render Customer Info if available */}
//       {customerInfo.full_name && (
//         <div>
//           <h3>Customer Information:</h3>
//           <p>
//             <strong>Name:</strong> {customerInfo.full_name}
//           </p>
//           <p>
//             <strong>Email:</strong> {customerInfo.email}
//           </p>
//           <p>
//             <strong>Phone:</strong> {customerInfo.phone_number}
//           </p>
//           <p>
//             <strong>Address:</strong> {customerInfo.address}
//           </p>
//         </div>
//       )}

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handlePayClick();
//         }}
//       >
//         <label htmlFor="email">Enter your email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Processing..." : "Pay Now"}
//         </button>
//         {/* Back Button */}
//         <button
//           type="button"
//           className="back-btn"
//           onClick={() => navigate("/")}
//         >
//           Back to Homepage
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentHomepage;

//updated code for dynamically taka amount calculation
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentHomepage.css";

const PaymentHomepage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const { orderId, orderDetails = {} } = location.state || {};
  const items = Array.isArray(orderDetails.items) ? orderDetails.items : [];
  const customerInfo = orderDetails.customerInfo || {};

  // Calculate the total amount dynamically
  const totalAmount = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handlePayClick = async () => {
    if (!email.trim()) {
      alert("Please enter a valid email.");
      return;
    }
    if (totalAmount < 50) {
      // Stripe minimum is 50 cents (in "cents" for USD)
      alert("Minimum payment amount is ৳50. Please add more items.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/payments/create-payment-intent/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalAmount, // Use the dynamically calculated amount
            user_email: email.trim(),
          }),
        }
      );

      const data = await response.json();
      console.log("Backend Response:", data);

      if (response.ok && data.clientSecret) {
        navigate("/paymentforstripe", {
          state: { clientSecret: data.clientSecret },
        });
      } else {
        alert(
          "Error creating payment intent: " + (data.error || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating payment intent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-homepage">
      <div className="container">
        <h1>React Stripe Payment</h1>
        <p>
          <strong>Order ID:</strong> {orderId || "N/A"}
        </p>
        <p>
          <strong>Amount:</strong> ৳{totalAmount.toLocaleString()} BDT
        </p>

        {/* Render Order Details Properly */}
        <div>
          <h3>Order Details:</h3>
          {items.length > 0 ? (
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <strong>{item.name || "Unnamed Item"}</strong> - ৳
                  {(item.price * item.quantity).toLocaleString()} (
                  {item.quantity} x ৳{item.price})
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in the order.</p>
          )}
        </div>

        {/* Render Customer Info if available */}
        {customerInfo.full_name && (
          <div>
            <h3>Customer Information:</h3>
            <p>
              <strong>Name:</strong> {customerInfo.full_name}
            </p>
            <p>
              <strong>Email:</strong> {customerInfo.email}
            </p>
            <p>
              <strong>Phone:</strong> {customerInfo.phone_number}
            </p>
            <p>
              <strong>Address:</strong> {customerInfo.address}
            </p>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePayClick();
          }}
        >
          <label htmlFor="email">Enter your email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
          {/* Back Button */}
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/")}
          >
            Back to Homepage
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentHomepage;
