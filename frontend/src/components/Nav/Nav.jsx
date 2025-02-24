import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Nav.css";
import { scrollToSection } from "../../utilities/scroll.js";
import { Link } from "react-router-dom";

const Nav = ({ handleLogOut, log }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="nav-logo">Artificial Ledger Airlines</div>
      <ul className={isOpen ? "nav-links nav-active" : "nav-links"}>
        <li>
          <Link to="/">Home</Link> {/* Changed a to Link for routing */}
        </li>
        <li>
          <a onClick={() => scrollToSection("search")}>Search</a>
        </li>
        {log ? (
          <li>
            <Link to="/profile">Profile</Link> {/* Changed a to Link for routing */}
          </li>
        ) : null}
        {log ? (
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        ) : null}
        {!log ? (
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        ) : null}
        {log ? (
          <li onClick={handleLogOut}>
            <a href="#!" onClick={handleLogOut}>Sign Out</a> {/* Added href="#!" to prevent default behavior */}
          </li>
        ) : null}
      </ul>
      <div className="burger" onClick={toggleMenu}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </motion.nav>
  );
};

export default Nav;