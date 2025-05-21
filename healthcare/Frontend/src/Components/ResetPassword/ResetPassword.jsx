// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./ResetPassword.css"; // Optional: Add styling

// const ResetPassword = () => {
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();

//   const showToast = (message, type) => {
//     if (type === "success") {
//       toast.success(message, { position: "top-right", autoClose: 3000 });
//     } else if (type === "error") {
//       toast.error(message, { position: "top-right", autoClose: 3000 });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!otp.trim()) {
//       showToast("Please enter the OTP.", "error");
//       return;
//     }

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/verify-otp/", {
//         otp,
//       });
//       showToast(response.data.message || "OTP verified!", "success");
//       navigate("/setpassword");
//     } catch (error) {
//       showToast(
//         error.response?.data?.detail || "Invalid OTP. Please try again.",
//         "error"
//       );
//     }
//   };

//   return (
//     <div className="reset-password-page">
//       <ToastContainer />
//       <form onSubmit={handleSubmit} className="reset-password-form">
//         <h1>Verify OTP</h1>
//         <p>Enter the OTP sent to your email.</p>
//         <input
//           type="text"
//           placeholder="OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />
//         <button type="submit">Verify</button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;


//modified
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResetPassword.css"; // Optional: Add styling

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message, { position: "top-right", autoClose: 3000 });
    } else if (type === "error") {
      toast.error(message, { position: "top-right", autoClose: 3000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      showToast("Please enter the OTP.", "error");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/accounts/verify-otp/", {
        otp,
      });
      showToast(response.data.message || "OTP verified!", "success");
      navigate("/setpassword");
    } catch (error) {
      showToast(
        error.response?.data?.detail || "Invalid OTP. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="reset-password-page">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="reset-password-form">
        <h1>Verify OTP</h1>
        <p>Enter the OTP sent to your email.</p>
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default ResetPassword;

