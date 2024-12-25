import React, { useState } from "react";
import "./Chat.css";

const Chat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const API_KEY = "AIzaSyAoiR0gzsV4wvT2Lc02trSv2ODnJh4gLnE";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

 const handleSend = async () => {
   if (!input.trim()) return;

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
                 text: input, // User input goes here
               },
             ],
           },
         ],
       }),
     });

     const data = await response.json();
     console.log("Full Response:", data); // Debug log

     if (data.candidates && data.candidates.length > 0) {
       const responseText = data.candidates[0].content.parts[0].text;
       setResponse(responseText); // Set the extracted response
     } else if (data.error) {
       setResponse(`API Error: ${data.error.message}`);
     } else {
       setResponse("No response from API.");
     }
   } catch (error) {
     console.error("Error:", error);
     setResponse("Error communicating with the API.");
   }
 };


  return (
    <div className="chat-container">
      <h1 className="chat-title">Chat with Gemini</h1>
      <div className="chat-box">
        <textarea
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button className="chat-send" onClick={handleSend}>
          Send
        </button>
      </div>
      {response && (
        <div className="chat-response">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
