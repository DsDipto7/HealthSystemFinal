// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import PaymentForm from "./PaymentForm";

// const stripePromise = loadStripe(
//   "pk_test_51QvEz9RoqWK389OSXrTxrJPZcVB4dAXWsIihe3gxak8P0R1DKiTQK8BOLZMLGVwEHRp6P8Ebw05R2jTs6cVTgWQw00gwuP9fgd"
// ); // Replace with your Stripe publishable key

// const PaymentPage = () => {
//   const location = useLocation();
//   const { clientSecret } = location.state || {};
//   const [options, setOptions] = useState(null);

//   useEffect(() => {
//     if (clientSecret) {
//       setOptions({
//         clientSecret,
//         appearance: {
//           theme: "stripe",
//         },
//       });
//     }
//   }, [clientSecret]);

//   return (
//     <div className="container">
//       <h1>Complete Your Payment</h1>
//       {options ? (
//         <Elements stripe={stripePromise} options={options}>
//           <PaymentForm />
//         </Elements>
//       ) : (
//         <p>Loading payment details...</p>
//       )}
//     </div>
//   );
// };

// export default PaymentPage;


//2nd form


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe("pk_test_51QvEz9RoqWK389OSXrTxrJPZcVB4dAXWsIihe3gxak8P0R1DKiTQK8BOLZMLGVwEHRp6P8Ebw05R2jTs6cVTgWQw00gwuP9fgd");

const PaymentPage = () => {
  const location = useLocation();
  const { clientSecret } = location.state || {};
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (clientSecret) {
      setOptions({
        clientSecret,
        appearance: {
          theme: "stripe",
        },
      });
    }
  }, [clientSecret]);

  return (
    <div className="container">
      <h1>Complete Your Payment</h1>
      {options ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
};

export default PaymentPage;
