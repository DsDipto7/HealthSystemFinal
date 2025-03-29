
//3rd try till(23/03/2025)

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Healthchatbot.css";

// export default function HealthChatbot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const navigate = useNavigate();

//   const sendMessage = async (event) => {
//     event.preventDefault();
//     if (!input.trim()) return;

//     const date = new Date();
//     const hour = date.getHours();
//     const minute = date.getMinutes();
//     const strTime = `${hour}:${minute}`;

//     const newMessage = {
//       text: input,
//       time: strTime,
//       sender: "user",
//     };

//     setMessages([...messages, newMessage]);
//     setInput("");

//     try {
//       const response = await fetch("http://192.168.0.103:8080/get", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ msg: input }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       const botMessage = {
//         text: data.response || "I'm not sure how to answer that.",
//         time: strTime,
//         sender: "bot",
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//     }
//   };

//   return (
//     <div className="health-chatbot container-fluid h-100">
//       <div className="row justify-content-center h-100">
//         <div className="col-md-8 col-xl-6 chat">
//           <div className="card">
//             {/* Header with Back Button */}
//             <div className="card-header msg_head d-flex align-items-center">
//               <button className="back_btn btn btn-light me-2" onClick={() => navigate("/")}>⬅ Back</button>
//               <div className="img_cont">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
//                   className="rounded-circle user_img"
//                   alt="Bot Avatar"
//                 />
//               </div>
//               <div className="user_info ms-3">
//                 <h5 className="mb-0">Medical Chatbot</h5>
//                 <p className="text-muted">Ask me anything!</p>
//               </div>
//             </div>

//             {/* Chat Messages */}
//             <div className="card-body msg_card_body">
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`d-flex mb-3 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}
//                 >
//                   {msg.sender === "bot" && (
//                     <div className="img_cont_msg me-2">
//                       <img
//                         src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
//                         className="rounded-circle user_img_msg"
//                         alt="Bot"
//                       />
//                     </div>
//                   )}
//                   <div className={`msg_cotainer${msg.sender === "user" ? "_send" : ""}`}>
//                     {msg.text}
//                     <span className={`msg_time${msg.sender === "user" ? "_send" : ""}`}>{msg.time}</span>
//                   </div>
//                   {msg.sender === "user" && (
//                     <div className="img_cont_msg ms-2">
//                       <img
//                         src="https://i.ibb.co/d5b84Xw/Untitled-design.png"
//                         className="rounded-circle user_img_msg"
//                         alt="User"
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Chat Input */}
//             <div className="card-footer">
//               <form onSubmit={sendMessage} className="input-group">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   placeholder="Type your message..."
//                   autoComplete="off"
//                   className="form-control type_msg"
//                   required
//                 />
//                 <button type="submit" className="btn btn-primary ms-2">Send</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





//4th try after 23/03/2025


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Healthchatbot.css";

// export default function HealthChatbot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const navigate = useNavigate();

//   const sendMessage = async (event) => {
//     event.preventDefault();
//     if (!input.trim()) return;

//     const date = new Date();
//     const hour = date.getHours();
//     const minute = date.getMinutes();
//     const strTime = `${hour}:${minute}`;

//     const newMessage = {
//       text: input,
//       time: strTime,
//       sender: "user",
//     };

//     setMessages([...messages, newMessage]);
//     setInput("");

//     try {
//       // const response = await fetch("http://192.168.0.103:8080/get", {
//        const response = await fetch("http://192.168.0.103:8080/get", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ msg: input }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       const botMessage = {
//         text: data.response || "I'm not sure how to answer that.",
//         time: strTime,
//         sender: "bot",
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//     }
//   };

//   return (
//     <div className="health-chatbot container-fluid h-100">
//       <div className="row justify-content-center h-100">
//         <div className="col-md-8 col-xl-6 chat">
//           <div className="card">
//             {/* Header with Back Button */}
//             <div className="card-header msg_head d-flex align-items-center">
//               <button className="back_btn btn btn-light me-2" onClick={() => navigate("/")}>⬅ Back</button>
//               <div className="img_cont">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
//                   className="rounded-circle user_img"
//                   alt="Bot Avatar"
//                 />
//               </div>
//               <div className="user_info ms-3">
//                 <h5 className="mb-0">Medical Chatbot</h5>
//                 <p className="text-muted">Ask me anything!</p>
//               </div>
//             </div>

//             {/* Chat Messages */}
//             <div className="card-body msg_card_body">
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`d-flex mb-3 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}
//                 >
//                   {msg.sender === "bot" && (
//                     <div className="img_cont_msg me-2">
//                       <img
//                         src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
//                         className="rounded-circle user_img_msg"
//                         alt="Bot"
//                       />
//                     </div>
//                   )}
//                   <div className={`msg_cotainer${msg.sender === "user" ? "_send" : ""}`}>
//                     {msg.text}
//                     <span className={`msg_time${msg.sender === "user" ? "_send" : ""}`}>{msg.time}</span>
//                   </div>
//                   {msg.sender === "user" && (
//                     <div className="img_cont_msg ms-2">
//                       <img
//                         src="https://i.ibb.co/d5b84Xw/Untitled-design.png"
//                         className="rounded-circle user_img_msg"
//                         alt="User"
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Chat Input */}
//             <div className="card-footer">
//               <form onSubmit={sendMessage} className="input-group">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   placeholder="Type your message..."
//                   autoComplete="off"
//                   className="form-control type_msg"
//                   required
//                 />
//                 <button type="submit" className="btn btn-primary ms-2">Send</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






//5th try at 23/03/2025 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Healthchatbot.css";

export default function HealthChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const strTime = `${hour}:${minute}`;

    // Add user message to chat
    const newMessage = { text: input, time: strTime, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:8080/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: input }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      if (!data.response) throw new Error("Invalid response format");

      // Add bot response to chat
      const botMessage = { text: data.response, time: strTime, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="health-chatbot container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-md-8 col-xl-6 chat">
          <div className="card">
            {/* Header */}
            <div className="card-header msg_head d-flex align-items-center">
              <button className="back_btn btn btn-light me-2" onClick={() => navigate("/")}>
                ⬅ Back
              </button>
              <div className="img_cont">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
                  className="rounded-circle user_img"
                  alt="Bot Avatar"
                />
              </div>
              <div className="user_info ms-3">
                <h5 className="mb-0">Medical Chatbot</h5>
                <p className="text-muted">Ask me anything!</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="card-body msg_card_body">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex mb-3 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="img_cont_msg me-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
                        className="rounded-circle user_img_msg"
                        alt="Bot"
                      />
                    </div>
                  )}
                  <div className={`msg_cotainer${msg.sender === "user" ? "_send" : ""}`}>
                    {msg.text}
                    <span className={`msg_time${msg.sender === "user" ? "_send" : ""}`}>{msg.time}</span>
                  </div>
                  {msg.sender === "user" && (
                    <div className="img_cont_msg ms-2">
                      <img
                        src="https://i.ibb.co/d5b84Xw/Untitled-design.png"
                        className="rounded-circle user_img_msg"
                        alt="User"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="card-footer">
              <form onSubmit={sendMessage} className="input-group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  autoComplete="off"
                  className="form-control type_msg"
                  required
                />
                <button type="submit" className="btn btn-primary ms-2">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
