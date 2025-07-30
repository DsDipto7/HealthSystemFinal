import "./App.css";
 // ✅ Valid because it's inside src/

import Homepage from "./Components/Homepage/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import About from "./Components/About/About";
import Product from "./Components/Product/Product";
import Contact from "./Components/Contact/Contact";
import Adminlogin from "./Components/Admin/loginadmin";
import Adminregister from "./Components/Admin/registeradmin";
import AdminDashboard from "./Components/AdminDashboard/Adminpage";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword"; // Adjust path if necessary
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import SetPassword from "./Components/SetPassword/SetPassword";
import Chat from "./Components/Chat/Chat";
import Service from "./Components/Service/Service";
import DiseasePrediction from "./Components/Deseas_Pred/DiseasePrediction";
import Checkout from "./Components/Checkout/Checkout";
import Payment from "./Components/Payment/Payment";
import PrescriptionUpload from "./Components/PrescriptionUpload/PrescriptionUpload";
import Ambulance from "./Components/Ambulance/Ambulance";

//for doctor login
import Doctorlogin from "./Components/Doctorlogin/Doctorlogin";
import Doctorhomepage from "./Components/Doctorlogin/Doctorhomepage";

//new added for payment
import PaymentHomepage from "./Components/PaymentHomepage/PaymentHomepage";
import PaymentPage from "./Components/PaymentHomepage/PaymentPage";
import SuccessPage from "./Components/PaymentHomepage/SuccessPage";
import FailurePage from "./Components/PaymentHomepage/FailurePage";
import HealthChatbot from "./Components/Healthchatbot/Healthchatbot"; //for chatbot with flask llm
import DoctorList from "./Components/DoctorList/DoctorList";

// Import PrivateRoute
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownProvider } from "./context/DropdownContext";


//for user_profile,
import UserProfile from "./Components/UserProfile/UserProfile"; //for user_profile

//for doctor_profile
import DoctorProfile from "./Components/DoctorProfile/DoctorProfile"; //for doctor_profile





function App() {
  // Example of checking if the user is authenticated
  // const isAuthenticated = !!localStorage.getItem('accessToken'); // You can replace this with your authentication logic

  return (
    <DropdownProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/forget_password" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/setpassword" element={<SetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/service" element={<Service />} />
          <Route path="/predictdisease" element={<DiseasePrediction />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/upload-prescription" element={<PrescriptionUpload />} />
          <Route path="/healthchatbot" element={<HealthChatbot />} />
          <Route path="/ambulance" element={<Ambulance />} />
          <Route path="/doctor" element={<DoctorList />} />
          
           {/* for doctor */}
          <Route path="/doctorlogin" element={<Doctorlogin />} />
          <Route path="/doctorhomepage" element={<Doctorhomepage />} />

          {/* for payment */}
          <Route path="/paymenthomepage" element={<PaymentHomepage />} />
          <Route path="/paymentforstripe" element={<PaymentPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/failure" element={<FailurePage />} />
           {/* User Profile Route */}
          <Route path="/user-profile" element={<UserProfile />} />
          {/* Doctor Profile Route */}
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          {/* Prescription Upload Route */}
     

 

          {/* Admin Routes */}


    

          {/* admin er   jonno  */}
          <Route path="/loginadmin" element={<Adminlogin />} />
          <Route path="/registeradmin" element={<Adminregister />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />

          {/* Protected Route - Wrapped in PrivateRoute */}
        </Routes>
      </Router>
    </DropdownProvider>
  );
}

export default App;
