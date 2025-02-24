import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import passwordsvg from '../../images/eye.svg';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{8}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;

  const handleValidation = () => {
    if (!usernameRegex.test(username)) {
      setValidationError(
        "Username must be 4-20 characters and can include letters, numbers, and underscores."
      );
      return false;
    }
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address.");
      return false;
    }
    if (!phoneRegex.test(phoneNumber)) {
      setValidationError("Phone number must be exactly 8 digits.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setValidationError(
        "Password must be 6-20 characters and include at least one letter and one number."
      );
      return false;
    }
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!handleValidation()) {
      return;
    }

    try {
      const result = await axios.post('http://localhost:8080/user/register', {
        username,
        password,
        email,
        phoneNumber,
      });

      if (result.status === 201) {
        setRegisterError('');
        navigate("/signin");
      } else {
        setRegisterError("Error registering user");
      }
    } catch (error) {
      if (error.response) {
        setRegisterError(error.response.data);
      } else {
        setRegisterError("Error registering user");
      }
      console.log(error);
    }
  };

  function handleShowPassword() {
    var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  }

  function handleShowConfirmPassword() {
    var x = document.getElementById("confirm-password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  }
  return (
    <div className='background-register'>
      <div className="register-container">
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">
              <i className="fas fa-user"></i>
              <input
                type="text"
                id="username"
                name="username"
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

          <div className="form-group">
            <label htmlFor="phone">
              <i className="fas fa-phone"></i>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="PHONE NUMBER"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)} 
                required
              />
            </label>
          </div>

          <div className="form-group" 
          >
            <label htmlFor="password">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </label>
        <div onClick={handleShowPassword} className='show-password1'><img src={passwordsvg} alt="" /></div>
          </div>

          <div className="form-group" style={{marginTop:"-25px"}}>
            <label htmlFor="confirm-password">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="CONFIRM PASSWORD"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required
              />
            </label>
        <div  onClick={handleShowConfirmPassword} className='show-password1'>
          <img src={passwordsvg} alt="" />
          </div>
          </div>

          {validationError && <div style={{color:"red"}}>{validationError}</div>}
          {registerError && <div style={{color:"red"}}>{registerError}</div>}

          <button type="submit" className="register-btn">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
