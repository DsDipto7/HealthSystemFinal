// import React, { useState } from "react";
// import "./Chat.css";

// const Chat = () => {
//   const [input, setInput] = useState("");
//   const [response, setResponse] = useState("");
//   const API_KEY = "AIzaSyAoiR0gzsV4wvT2Lc02trSv2ODnJh4gLnE";
//   const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

//  const handleSend = async () => {
//    if (!input.trim()) return;

//    try {
//      const response = await fetch(url, {
//        method: "POST",
//        headers: {
//          "Content-Type": "application/json",
//        },
//        body: JSON.stringify({
//          contents: [
//            {
//              parts: [
//                {
//                  text: input, // User input goes here
//                },
//              ],
//            },
//          ],
//        }),
//      });

//      const data = await response.json();
//      console.log("Full Response:", data); // Debug log

//      if (data.candidates && data.candidates.length > 0) {
//        const responseText = data.candidates[0].content.parts[0].text;
//        setResponse(responseText); // Set the extracted response
//      } else if (data.error) {
//        setResponse(`API Error: ${data.error.message}`);
//      } else {
//        setResponse("No response from API.");
//      }
//    } catch (error) {
//      console.error("Error:", error);
//      setResponse("Error communicating with the API.");
//    }
//  };


//   return (
//     <div className="chat-container">
//       <h1 className="chat-title">Chat with Gemini</h1>
//       <div className="chat-box">
//         <textarea
//           className="chat-input"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message here..."
//         />
//         <button className="chat-send" onClick={handleSend}>
//           Send
//         </button>
//       </div>
//       {response && (
//         <div className="chat-response">
//           <h2>Response:</h2>
//           <p>{response}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;
import React, { useState } from "react";
import "./Chat.css";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const API_KEY = "AIzaSyA8jTxONazDOfFxfZQRcWuX5w1SPG9NwT4";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const handleSend = async (retry = 0) => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: input,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        let responseText = data.candidates[0].content.parts[0].text;
        // Remove all asterisks (*) from Gemini response
        responseText = responseText.replace(/\*/g, "");
        const botMessage = { sender: "bot", text: responseText };
        setMessages((prev) => [...prev, botMessage]);
      } else if (data.error) {
        if (data.error.message.includes("overloaded") && retry < 3) {
          setTimeout(() => handleSend(retry + 1), 2000);
          return;
        }
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `API Error: ${data.error.message}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "No response from API." },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error communicating with the API." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">💬 Chat with Gemini</h1>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-box">
        <textarea
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="chat-send" onClick={() => handleSend()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
