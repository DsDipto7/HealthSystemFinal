// import React, { useState, useEffect } from "react";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import axios from "axios";
// import backgroundImg from "../../assets/doctor.jpg";
// import backgroundImage1 from "../../assets/banner.webp";
// import backgroundImage2 from "../../assets/banner1.webp";

// import "./Homepage.css";

// const Homepage = () => {
//   const [username, setUsername] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkLoggedInUser = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         if (token) {
//           const response = await axios.get("http://127.0.0.1:8000/api/user/", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setIsLoggedIn(true);
//           setUsername(response.data.username);
//         } else {
//           setIsLoggedIn(false);
//         }
//       } catch {
//         setIsLoggedIn(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkLoggedInUser();
//   }, []);

  


//   if (loading) {
//     return <div>Loading...</div>; // Add a loading state while checking login status
//   }

//   return (
//     <div className="home">
//       <Navbar />
//       <div className="background-section" style={{ backgroundImage: `url(${backgroundImg})` }}>
        
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Homepage;




//modified code  for scroalar image  in 23/03/2025
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import backgroundImg from "../../assets/doctor.jpg";
import backgroundImage1 from "../../assets/banner.webp";
import backgroundImage2 from "../../assets/banner1.webp";
import "./Homepage.css";

const Homepage = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await axios.get("http://127.0.0.1:8000/api/user/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsLoggedIn(true);
          setUsername(response.data.username);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedInUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Slider settings for scrolling banner
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="home">
      <Navbar />

      {/* Scrolling Banner */}
      <div className="banner-container">
        <Slider {...settings}>
          <div>
            <img src={backgroundImage1} alt="Banner 1" className="banner-image" />
          </div>
          <div>
            <img src={backgroundImage2} alt="Banner 2" className="banner-image" />
          </div>
        </Slider>
      </div>

      {/* Noticebar Text with Marquee Effect
      <div className="noticebar">
        <span className="noticebar-text">
          ************** ঔষধ সংক্রান্ত তথ্যের জন্য -01614981899,01580362480 এই নাম্বার গুলি তে যোগাযোগ করুন *******************
        </span>
      </div> */}

      <div className="background-section" style={{ backgroundImage: `url(${backgroundImg})` }}>
        {/* Additional content can be added here */}
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
