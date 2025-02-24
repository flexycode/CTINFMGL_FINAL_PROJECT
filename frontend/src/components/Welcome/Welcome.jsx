import React from 'react';
import './Welcome.css';
import { scrollToSection } from '../../utilities/scroll';
import {motion} from 'framer-motion'
const Welcome = () => {
  return (
    <div className="welcome-container">
      <span className='travel'>JOURNEY BEYOND BORDERS!</span>
        <h1>Discover and Reserve Your Next Adventure <span className='hollow'>Experience</span></h1>
        <motion.button
        onClick={()=>scrollToSection("search")}
         className='travel-button'
             whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
           animate={{
            rotate: [0, -5, 5, -5, 0], 
          }}
          transition={{
            duration: 0.5, 
            ease: "easeInOut",
            repeat: Infinity, 
            repeatDelay: 3, 
          }}
        
        >GET STARTED!</motion.button>
    </div>
  );
};

export default Welcome;
