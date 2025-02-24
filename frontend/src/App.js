import "./App.css";
import { useEffect, useState, createContext } from "react";
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";
import Main from "./pages/Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Admin from "./pages/Admin/Admin";
import { jwtDecode } from "jwt-decode";
import Timeout_ from "./components/Timeout/Session_Timeout";

// Creating a context for managing login state
const MyContext = createContext();

function App() {
  // State variables for managing login status, admin status, and warning state
  const [loggedin, setLogin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [warning, setWarning] = useState(false);

  // Effect to check token expiration and manage session timeout
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      if (token) {
        const decoded = jwtDecode(token); // Decode the token to get expiration time
        const currentDateInSeconds = Date.now() / 1000; // Get current time in seconds
        const timeLeftInSeconds = decoded.exp - currentDateInSeconds; // Calculate time left until expiration

        // If the token is expired, set warning and log out
        if (timeLeftInSeconds <= 0) {
          setWarning(true);
          handleLogOut();
        }
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Effect to check login status based on token presence and role
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setLogin(false); // If no token, set loggedin to false
    } else {
      if (localStorage.getItem("role") === "admin") {
        setAdmin(true); // If role is admin, set admin to true
      } else {
        setLogin(true); // Otherwise, set loggedin to true
      }
    }
  }, []);

  // Function to handle successful login and set login state
  const handleID = () => {
    setLogin(true);
    localStorage.setItem("log", true); // Store login state in local storage

    if (localStorage.getItem("role") === "admin") {
      setAdmin(true); // Set admin state if role is admin
    }
  };

  // Function to handle logout
  const handleLogOut = () => {
    setLogin(false); // Reset login state
    setAdmin(false); // Reset admin state
    console.log(loggedin); // Log current login state
    localStorage.clear(); // Clear local storage
  };

  // Function to handle click on warning to dismiss it
  const handleClick = () => {
    setWarning(false); // Reset warning state
  };

  return (
    <>
      <Router>
        {warning ? <Timeout_ handleClick={handleClick} /> : ""} {/* Show timeout warning if applicable */}
        {admin ? ( // If user is admin, show admin routes
          <Routes>
            <Route path="/" element={<Admin handleLogOut={handleLogOut} />} />
            <Route path="/forgotPass" element={<ForgotPassword />} />
          </Routes>
        ) : loggedin ? ( // If user is logged in, show user routes
          <MyContext.Provider value={loggedin}>
            <Routes>
              <Route
                path="/"
                element={<Main id={loggedin} handleLogOut={handleLogOut} />}
              />
              <Route path="/forgotPass" element={<ForgotPassword />} />
              <Route path="/signin" element={<SignIn handleID={handleID} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </MyContext .Provider>
        ) : ( // If user is not logged in, show limited routes
          <>
            <MyContext.Provider value={loggedin}>
              <Routes>
                <Route
                  path="/"
                  element={<Main id={loggedin} handleLogOut={handleLogOut} />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/signin"
                  element={<SignIn handleID={handleID} />}
                />
                <Route path="/forgotPass" element={<ForgotPassword />} />
              </Routes>
            </MyContext.Provider>
          </>
        )}
      </Router>
    </>
  );
}

export default App; // Exporting the App component as default
export { MyContext }; // Exporting MyContext for use in other components