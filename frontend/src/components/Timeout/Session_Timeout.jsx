import React from 'react'
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion";
import close from "../../images/x-symbol.svg";
const Timeout_ = ({handleClick}) => {
  const navigate=useNavigate();


  const handleSessionButton = () =>{
    navigate('/signin');
    handleClick();
  }
 const handleClose = () =>{
  navigate('/');
  handleClick();
  }
  return (
    <motion.div  className="timeout"> 
    <img className="close-chat-timeout" src={close} onClick={handleClose} alt="close"/ >
    <h2 >Your session has Expired</h2>
    <div>You have to login again to continue</div>
    <button  onClick={handleSessionButton} >Sign In</button>
     </motion.div>
  )
}

export default Timeout_
