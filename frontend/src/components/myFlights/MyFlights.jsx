import React, { useState, useEffect } from "react";
import "./MyFlight.css";
import { motion } from 'framer-motion';
import axios from "axios";
import close from "../../images/x-symbol.svg";

const MyFlights = ({ onFlightSelect }) => {
  const [flights, setFlights] = useState([]); 
  const [empty, setEmpty] = useState(false);
  const [flight_ID, setFlight_ID] = useState("");

  const handleFlight = (flightId,price,date) => {
    onFlightSelect(flightId,price,date);
    localStorage.setItem("fid",flightId);
    localStorage.setItem("FlightPrice",price);
    setFlight_ID(flightId);
  };


useEffect(() => {
  fetchAllData();
}, []);

const handleDelete = async (flight_id) => {
  try {
    await axios.delete(`http://localhost:8080/cart/delete`, {
      params: { flight_id}, 
      headers: {
        authorization: `${localStorage.getItem("token")}`, 
      },
    });
    fetchAllData(); 
  } catch (e) {
    console.error("Error deleting flight:", e);
  }
};

  const fetchAllData = async () => {
    try {
      const result = await axios.get("http://localhost:8080/cart/getall",
        {
          headers:{
            authorization: `${localStorage.getItem("token")}`,
          }
        }
      );
      if(result.data.length!==0){
      setFlights(result.data);
      setEmpty(false);
      }
      else{
        setEmpty(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flights" style={empty ? { display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}}>
      {empty ? '' : <center><h1>My Flights</h1></center>}
        {empty ? (
          <center>
            <h1 className="empty-message">You Didn't Book Any Flights</h1>
          </center>
        ) : (
          <div className="myflights-grid">
            {flights.map((flight) => (
              <motion.div
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                key={flight.FlightID}
                className="flight-card"
              >
                <div className="flight-info">
                <i onClick={()=>handleDelete(flight.FLightID)}className="fa-solid fa-x"></i>
                  <center><h2>Flight to {flight.To}</h2></center>
                  <div>
                  
                    <p><strong>From:</strong> {flight.From}</p>
                    <p><strong>To:</strong> {flight.To}</p>
                    <p><strong>Date:</strong> {flight.Date}</p>
                    <p><strong>Duration:</strong> {flight.Duration} hrs</p>
                    <p><strong>Price:</strong> ${flight.Price}</p>
                    <button onClick={() => handleFlight(flight.FLightID,flight.Price,flight.Date)}>Select Flight</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyFlights;
