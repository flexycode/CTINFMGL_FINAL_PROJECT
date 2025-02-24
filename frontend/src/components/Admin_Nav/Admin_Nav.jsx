import React from 'react'
import './Admin_Nav.css'
import { scrollToSection } from "../../utilities/scroll.js";
const Admin_Nav = ({handleLogOut}) => {
    const handleLog = () =>{
        handleLogOut();
        console.log("logged out");
    }
  return (
    <div className='admin-nav'>
        <ul>
        <li onClick={() => scrollToSection("search")}>
         Search
        </li>
            <li onClick={handleLog}>Sign Out</li>
        </ul>
    </div>
  )
}

export default Admin_Nav
