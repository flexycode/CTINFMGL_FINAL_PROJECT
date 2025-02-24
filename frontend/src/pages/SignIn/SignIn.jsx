import React, { useEffect, useState } from "react";
import "./SignIn.css";
import { Link,useNavigate  } from "react-router-dom";
import axios from "axios";

const SignIn = ({handleID}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [token, setToken] = useState(()=>localStorage.getItem("token") || '');
  const [role, setRole] = useState(()=>localStorage.getItem("role") || '');
  const navigate=useNavigate();

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  
  }, [token, role]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8080/user/login", {
        username,
        password,
      });
      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("role", result.data.role);
        handleID();
        navigate("/"); 
        
      } else {
        setLoginError("Wrong email or password");
      }
    } catch (error) {
      console.log(error);
      setLoginError("Login failed. Please try again.");
    }
  };


  return (
    <div className="background-signin">
      <div className="signin-container">
        <form onSubmit={handleLogin}>
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
          </div>

          <div className="forgot-password">
        <Link to='/forgotPass'><a>Forgot Password?</a></Link> 
          </div>

          <button type="submit" className="login-btn">
            LOGIN
          </button>

         <Link to="/register"> <button type="button" className="signup-btn" >
            SIGN UP
          </button></Link>
        </form>

        {loginError && <div className="login-error">{loginError}</div>}
      </div>
    </div>
  );
};

export default SignIn;