import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Login.css";

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message, { position: "top-right", autoClose: 3000 });
    } else if (type === "error") {
      toast.error(message, { position: "top-right", autoClose: 3000 });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/login/",
        loginData
      );
      showToast("Login successful!", "success");
      localStorage.setItem("accessToken", response.data.tokens.access);
      localStorage.setItem("refreshToken", response.data.tokens.refresh);
      navigate("/");
    } catch (error) {
      showToast(
        error.response?.data?.detail || "Login failed. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Validation for required fields
    if (
      !registerData.username.trim() ||
      !registerData.email.trim() ||
      !registerData.password1.trim() ||
      !registerData.password2.trim()
    ) {
      showToast("Please fill up all the required fields.", "error");
      return;
    }

    // Validation for password match
    if (registerData.password1 !== registerData.password2) {
      showToast("Passwords do not match.", "error");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/accounts/register/", registerData);
      showToast("Registration successful! Redirecting to login...", "success");
      setTimeout(() => {
        setIsRightPanelActive(false);
      }, 2000);
    } catch (error) {
      showToast(
        error.response?.data?.detail ||
          "This email and username exist. Please try with another.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer /> {/* Add ToastContainer */}
      <div
        className={`container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
      >
        {/* Sign-Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegisterSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              name="username"
              placeholder="Name"
              value={registerData.username}
              onChange={handleRegisterChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
            />
            <input
              type="password"
              name="password1"
              placeholder="Password"
              value={registerData.password1}
              onChange={handleRegisterChange}
            />
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={registerData.password2}
              onChange={handleRegisterChange}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* Sign-In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>Sign in</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign In"}
            </button>
            <Link to="/loginadmin" className="ghost">Are you an admin?</Link>
            <Link to="/doctorlogin" className="ghost">Are you an doctor?</Link>
            <Link to="/forget_password" className="ghost">Forget Password?</Link>
          </form>
          {/* Link to admin login */}
          
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
