import React from "react";
import "./Main.css";
import { useState} from "react";
import Nav from "../../components/Nav/Nav";
import Welcome from "../../components/Welcome/Welcome";
import Search from "../../components/Search/Search";
import Footer from "../../components/Footer/Footer";
import Video1 from "../../components/Video/Video";
import Chatbot from "../../components/ChatBot/Chatbot";
import live from '../../images/live-chat.svg';

const Main = ({id,handleLogOut,handleCart, cart}) => {
  const [chatbot,setChatBot]= useState(false);
  const log=localStorage.getItem("log");

  const handleChatBot= () =>{
    setChatBot(!chatbot);
  }

 
  return (
    <>
      {log ? (
        <>
        <button className="chat-button" onClick={handleChatBot}><img src={live} alt="" /></button>
         <div className="main-body">
            <Nav handleLogOut={handleLogOut} log={log} />
            <Welcome />
          </div>
          <section id="search">
            <Search userID={log} handleCart={handleCart}/>
          </section>
        {chatbot ? <Chatbot handleChatBot={handleChatBot}/> : ""};
          <Video1 />
          <Footer />
        </>
      ) : (
        <>  
        <div className="main-body">
            <Nav handleLogOut={handleLogOut} log={log} />
            <Welcome />
          </div>
          <section id="search">
            <Search userID={log}/>
          </section>
          <Video1 />
          <Footer />
          
        </>
      )}
    </>

  );
};

export default Main;
