import React, { useState } from "react";
import {motion} from "framer-motion";
import axios from "axios";
import close from "../../images/x-symbol.svg";
import './Chatbot.css';
const Chatbot = ({handleChatBot}) => {
  const [messages, setMessages] = useState([{sender: "bot",text: "How can i help you today?"}]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () =>{
    handleChatBot();
  }
  
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = { sender: "user", text: userInput };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/openAi/getResponse", {
        input: newUserMessage.text,
      },  {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      const botMessage = { sender: "bot", text: response.data.message };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error communicating with the chatbot:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
    style={{fontFamily: "Arial, sans-serif" }} className="chatbot-main">
        <img className="close-chat" src={close} onClick={handleClick} alt="close"/ >
      <div
        style={{
          height: "300px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          overflowY: "scroll",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.sender === "user" ? "right" : "left",
              margin: "10px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: message.sender === "user" ? "#0078ff" : "#c9c7c7",
                color: message.sender === "user" ? "white" : "black",
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
        {loading && (
          <div
            style={{
              textAlign: "left",
              margin: "10px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#c9c7c7",
                color: "black",
                fontStyle: "italic",
              }}
            >
              <span class="loader" style={{color:"blue"}}></span>
            </div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </motion.div>
  );
};

export default Chatbot;
