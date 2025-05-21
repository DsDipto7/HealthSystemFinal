// import React, { useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./SetPassword.css"; // Optional: Add styling

// const SetPassword = () => {
//   const [password1, setPassword1] = useState("");
//   const [password2, setPassword2] = useState("");

//   const showToast = (message, type) => {
//     if (type === "success") {
//       toast.success(message, { position: "top-right", autoClose: 3000 });
//     } else if (type === "error") {
//       toast.error(message, { position: "top-right", autoClose: 3000 });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!password1.trim() || !password2.trim()) {
//       showToast("Both fields are required.", "error");
//       return;
//     }

//     if (password1 !== password2) {
//       showToast("Passwords do not match.", "error");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/set-password/",
//         { password: password1 }
//       );
//       showToast(response.data.message || "Password updated successfully!", "success");
//     } catch (error) {
//       showToast(
//         error.response?.data?.detail || "Failed to reset password.",
//         "error"
//       );
//     }
//   };

//   return (
//     <div className="set-password-page">
//       <ToastContainer />
//       <form onSubmit={handleSubmit} className="set-password-form">
//         <h1>Set New Password</h1>
//         <input
//           type="password"
//           placeholder="New Password"
//           value={password1}
//           onChange={(e) => setPassword1(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           value={password2}
//           onChange={(e) => setPassword2(e.target.value)}
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default SetPassword;


//modifed code with email and password
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SetPassword.css";

const SetPassword = () => {
  const [email, setEmail] = useState(""); // New email field
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message, { position: "top-right", autoClose: 3000 });
    } else if (type === "error") {
      toast.error(message, { position: "top-right", autoClose: 3000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password1.trim() || !password2.trim()) {
      showToast("Email and password fields are required.", "error");
      return;
    }

    if (password1 !== password2) {
      showToast("Passwords do not match.", "error");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/reset-password/",
        { email, password: password1 }
      );
      showToast(response.data.message || "Password updated successfully!", "success");

      // Redirect to the login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      showToast(
        error.response?.data?.detail || "Failed to reset password.",
        "error"
      );
    }
  };

  return (
    <div className="set-password-page">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="set-password-form">
        <h1>Set New Password</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default SetPassword;
