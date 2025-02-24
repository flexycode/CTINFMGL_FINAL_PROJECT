import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [username,setUsername]=useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setShowPopup(true);
    setMessage("If your email is correct, you will receive a new password!");
    try {
      await axios.post("http://localhost:8080/email/forgotPass", {
        email,
        username
      });
    } catch (e) {
      console.log(e);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="background-register">
      <div className="register-container">
        <form onSubmit={handleForgotPassword}>
        <div className="form-group">
            <label htmlFor="username">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>

          <button type="submit" className="register-btn">
            SEND PASSWORD
          </button>
        </form>

        <button
          onClick={() => navigate("/signin")}
          className="register-btn"
          style={{
            marginTop: "10px",
            backgroundColor: "white",
            color: "red",
            border: "1px solid red",
          }}
        >
          BACK TO SIGN IN
        </button>

        {showPopup && (
          <div className="popup" style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            width: '80%',
            maxWidth: '400px',
            textAlign: 'center'
          }}>
            <div className="popup-content">
              <p style={{
                fontSize: '16px',
                marginBottom: '20px',
                color: '#333'
              }}>{message}</p>
              <button
                onClick={closePopup}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
