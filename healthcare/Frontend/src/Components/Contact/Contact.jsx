
// import React, { useState } from "react";
// import "./Contact.css";
// import contactBg from "../../assets/contact-bg.jpg";
// import contactPng from "../../assets/contact-png.png";
// import axios from "axios";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [isListening, setIsListening] = useState(false);
//   const recognition = new (window.SpeechRecognition ||
//     window.webkitSpeechRecognition)();

//   // Speech-to-Text functionality
//   const handleSpeechStart = () => {
//     setIsListening(true);
//     recognition.start();

//     recognition.onresult = (event) => {
//       const speechText = event.results[0][0].transcript;
//       setFormData((prevData) => ({
//         ...prevData,
//         message: prevData.message + " " + speechText,
//       }));
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech Recognition Error: ", event.error);
//     };
//   };

//   const handleSpeechStop = () => {
//     setIsListening(false);
//     recognition.stop();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { first_name, last_name, email, phone, message } = formData;

//     if (!first_name || !last_name || !email || !phone || !message.trim()) {
//       console.error("Please fill all the input fields");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/contact/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 201) {
//         alert("Message sent successfully!");
//         setFormData({
//           first_name: "",
//           last_name: "",
//           email: "",
//           phone: "",
//           message: "",
//         });
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       alert("Failed to send the message. Please try again later.");
//     }
//   };

//   return (
//     <section className="contact-section">
//       <div
//         className="contact-bg"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${contactBg})`,
//         }}
//       >
//         {/* <h3>Get in Touch with Us</h3> */}
//         <h2>Contact Us</h2>
//         <div className="line">
//           <div></div>
//           <div></div>
//           <div></div>
//         </div>
//         {/* <p className="text">
//           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda
//           iste facilis quos impedit fuga nobis modi debitis laboriosam velit
//           reiciendis quisquam alias corporis, maxime enim, optio ab dolorum
//           sequi qui.
//         </p> */}
//       </div>

//       <div className="contact-body">
//         <div className="contact-info">
//           <div>
//             <span>
//               <i className="fas fa-mobile-alt"></i>
//             </span>
//             <span>Phone No.</span>
//             <span className="text">1-2392-23928-2</span>
//           </div>
//           <div>
//             <span>
//               <i className="fas fa-envelope-open"></i>
//             </span>
//             <span>E-mail</span>
//             <span className="text">mail@company.com</span>
//           </div>
//           <div>
//             <span>
//               <i className="fas fa-map-marker-alt"></i>
//             </span>
//             <span>Address</span>
//             <span className="text">
//               2939 Patrick Street, Victoria TX, United States
//             </span>
//           </div>
//           <div>
//             <span>
//               <i className="fas fa-clock"></i>
//             </span>
//             <span>Opening Hours</span>
//             <span className="text">Monday - Friday (9:00 AM to 5:00 PM)</span>
//           </div>
//         </div>

//         <div className="contact-form">
//           <form onSubmit={handleSubmit}>
//             <div>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="First Name"
//                 value={formData.first_name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, first_name: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Last Name"
//                 value={formData.last_name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, last_name: e.target.value })
//                 }
//               />
//             </div>
//             <div>
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="E-mail"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Phone"
//                 value={formData.phone}
//                 onChange={(e) =>
//                   setFormData({ ...formData, phone: e.target.value })
//                 }
//               />
//             </div>
//             <textarea
//               rows="5"
//               placeholder="Message"
//               className="form-control"
//               value={formData.message}
//               onChange={(e) =>
//                 setFormData({ ...formData, message: e.target.value })
//               }
//             ></textarea>
//             <div className="button-group">
//               <input type="submit" className="send-btn" value="Send Message" />
//               <button
//                 type="button"
//                 className="speech-btn"
//                 onClick={isListening ? handleSpeechStop : handleSpeechStart}
//               >
//                 {isListening ? "Stop" : "Start Speak"}
//               </button>
//             </div>
//           </form>

//           <div>
//             <img src={contactPng} alt="Contact Illustration" />
//           </div>
//         </div>
//       </div>

//       <div className="map">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223700.1490386933!2d-97.11558670486288!3d28.829485511234168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864266db2e2dac3b%3A0xeee20d566f63267d!2sVictoria%2C%20TX%2C%20USA!5e0!3m2!1sen!2snp!4v1604921178092!5m2!1sen!2snp"
//           width="100%"
//           height="450"
//           frameBorder="0"
//           style={{ border: 0 }}
//           allowFullScreen
//           aria-hidden="false"
//           tabIndex="0"
//           title="Google Map"
//         ></iframe>
//       </div>

//       <div className="contact-footer">
//         <h3>Follow Us</h3>
//         <div className="social-links">
//           <button className="fab fa-facebook-f" aria-label="Facebook"></button>
//           <button className="fab fa-twitter" aria-label="Twitter"></button>
//           <button className="fab fa-instagram" aria-label="Instagram"></button>
//           <button className="fab fa-linkedin" aria-label="LinkedIn"></button>
//           <button className="fab fa-youtube" aria-label="YouTube"></button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;




//updated code at 21/05/2025  and also robust so that it cant be modified by other  and for white conatct wrtitten 


import React, { useState } from "react";
import "./Contact.css";
import contactBg from "../../assets/contact-bg.jpg";
import contactPng from "../../assets/contact-png.png";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isListening, setIsListening] = useState(false);
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  const handleSpeechStart = () => {
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setFormData((prevData) => ({
        ...prevData,
        message: prevData.message + " " + speechText,
      }));
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error: ", event.error);
    };
  };

  const handleSpeechStop = () => {
    setIsListening(false);
    recognition.stop();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, phone, message } = formData;

    if (!first_name || !last_name || !email || !phone || !message.trim()) {
      console.error("Please fill all the input fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/contact/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Message sent successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send the message. Please try again later.");
    }
  };

  return (
    <section className="contact-section">
      <div
        className="contact-bg"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${contactBg})`,
        }}
      >
        <h2>Contact Us</h2>
        <div className="contact-line">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className="contact-body">
        <div className="contact-info">
          <div>
            <span>
              <i className="fas fa-mobile-alt"></i>
            </span>
            <span>Phone No.</span>
            <span className="contact-text">1-2392-23928-2</span>
          </div>
          <div>
            <span>
              <i className="fas fa-envelope-open"></i>
            </span>
            <span>E-mail</span>
            <span className="contact-text">mail@company.com</span>
          </div>
          <div>
            <span>
              <i className="fas fa-map-marker-alt"></i>
            </span>
            <span>Address</span>
            <span className="contact-text">
              2939 Patrick Street, Victoria TX, United States
            </span>
          </div>
          <div>
            <span>
              <i className="fas fa-clock"></i>
            </span>
            <span>Opening Hours</span>
            <span className="contact-text">Monday - Friday (9:00 AM to 5:00 PM)</span>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                className="contact-form-control"
                placeholder="First Name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />
              <input
                type="text"
                className="contact-form-control"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="email"
                className="contact-form-control"
                placeholder="E-mail"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="text"
                className="contact-form-control"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <textarea
              rows="5"
              placeholder="Message"
              className="contact-form-control"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            ></textarea>
            <div className="contact-button-group">
              <input type="submit" className="contact-send-btn" value="Send Message" />
              <button
                type="button"
                className="contact-speech-btn"
                onClick={isListening ? handleSpeechStop : handleSpeechStart}
              >
                {isListening ? "Stop" : "Start Speak"}
              </button>
            </div>
          </form>

          <div>
            <img src={contactPng} alt="Contact Illustration" />
          </div>
        </div>
      </div>

      <div className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223700.1490386933!2d-97.11558670486288!3d28.829485511234168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864266db2e2dac3b%3A0xeee20d566f63267d!2sVictoria%2C%20TX%2C%20USA!5e0!3m2!1sen!2snp!4v1604921178092!5m2!1sen!2snp"
          width="100%"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex="0"
          title="Google Map"
        ></iframe>
      </div>

      <div className="contact-footer">
        <h3>Follow Us</h3>
        <div className="contact-social-links">
          <button className="fab fa-facebook-f" aria-label="Facebook"></button>
          <button className="fab fa-twitter" aria-label="Twitter"></button>
          <button className="fab fa-instagram" aria-label="Instagram"></button>
          <button className="fab fa-linkedin" aria-label="LinkedIn"></button>
          <button className="fab fa-youtube" aria-label="YouTube"></button>
        </div>
      </div>
    </section>
  );
};

export default Contact;


