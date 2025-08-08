
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DropdownContext } from "../../context/DropdownContext";
import "./Navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { isDropdownOpen, setIsDropdownOpen } = useContext(DropdownContext);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/accounts/user-info/",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setIsLoggedIn(true);
          setUsername(response.data.username || "User");
          localStorage.setItem("username", response.data.username || "User");
        } catch (error) {
          console.error("Error fetching user info:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoggedInUser();
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");

      if (refreshToken && accessToken) {
        await axios.post(
          "http://127.0.0.1:8000/api/accounts/logout/",
          { refresh: refreshToken },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
        setUsername("");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="navbar-container">
      <div className="navbar-logo-section">
        <a href="/" className="navbar-logo">
          HEALTHCARE
        </a>
        <p className="navbar-subtext">(your health is our first priority)</p>
      </div>

      <nav className="navbar-links">
        <Link to="/">Home</Link>

        <div className="navbar-dropdown">
          <button
            className="navbar-dropbtn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            More ▼
          </button>
          {isDropdownOpen && (
            <div className="navbar-dropdown-content">
              <Link to="/about">About</Link>
              <Link to="/predictdisease">Prediction</Link>
              <Link to="/product">Product</Link>
              <Link to="/service">Service</Link>
              <Link to="/chat">Chat</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/ambulance">Ambulance</Link>
              <Link to="/doctor">Doctor</Link>
              <Link to="/healthchatbot">Healthbot</Link>
              <Link to="/user-profile">My Profile</Link>
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <>
            <span className="navbar-username">Hi, {username}!</span>
            <button
              type="button"
              className="navbar-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

//  Template er code boshabo........
// import React, { useState, useEffect, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { DropdownContext } from "../../context/DropdownContext";
// import "./Navbar.css";

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const navigate = useNavigate();
//   const { isDropdownOpen, setIsDropdownOpen } = useContext(DropdownContext);

//   useEffect(() => {
//     const checkLoggedInUser = async () => {
//       const token = localStorage.getItem("accessToken");
//       if (token) {
//         try {
//           const response = await axios.get(
//             "http://127.0.0.1:8000/api/accounts/user-info/",
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           setIsLoggedIn(true);
//           setUsername(response.data.username || "User");
//           localStorage.setItem("username", response.data.username || "User");
//         } catch (error) {
//           console.error("Error fetching user info:", error);
//           setIsLoggedIn(false);
//         }
//       } else {
//         setIsLoggedIn(false);
//       }
//     };

//     checkLoggedInUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const refreshToken = localStorage.getItem("refreshToken");
//       const accessToken = localStorage.getItem("accessToken");

//       if (refreshToken && accessToken) {
//         await axios.post(
//           "http://127.0.0.1:8000/api/accounts/logout/",
//           { refresh: refreshToken },
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );

//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         setIsLoggedIn(false);
//         setUsername("");
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <header className="template-navbar">
//       <div className="container">
//         <div className="navbar-content">
//           <Link className="brand" to="/">
//             HEALTHCARE
//           </Link>

//           <ul className="nav-links">
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/service">Service</Link>
//             </li>
//             <li>
//               <Link to="/appointment">Appointment</Link>
//             </li>

//             <li className="dropdown">
//               <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
//                 More ▾
//               </button>
//               {isDropdownOpen && (
//                 <ul className="dropdown-menu">
//                   <li>
//                     <Link to="/predictdisease">Prediction</Link>
//                   </li>
//                   <li>
//                     <Link to="/product">Product</Link>
//                   </li>
//                   <li>
//                     <Link to="/ambulance">Ambulance</Link>
//                   </li>
//                   <li>
//                     <Link to="/chat">Chat</Link>
//                   </li>
//                   <li>
//                     <Link to="/contact">Contact</Link>
//                   </li>
//                   <li>
//                     <Link to="/doctor">Doctor</Link>
//                   </li>
//                   <li>
//                     <Link to="/healthchatbot">HealthBot</Link>
//                   </li>
//                   <li>
//                     <Link to="/user-profile">My Profile</Link>
//                   </li>
//                 </ul>
//               )}
//             </li>

//             {isLoggedIn ? (
//               <>
//                 <li className="welcome-user">Hi, {username}</li>
//                 <li>
//                   <button className="logout-btn" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <li>
//                 <Link to="/login">Login</Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </header>
//   );
// }

