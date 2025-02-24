import React, { useEffect, useState } from "react";
import { Reorder, motion } from "framer-motion";
import "./Search.css";
import axios from "axios";

const Search = ({ userID }) => { 
  
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("");

  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");

  const[warning,setWarning]=useState(false);

  const [cartMessage,setCartMessage]=useState(false);
  const cartmessage="Flight added successfully!";

  const countries = [
    "New York",
    "Los Angeles",
    "London",
    "Paris",
    "Tokyo",
    "Berlin",
    "Dubai",
    "Rome",
    "Cairo",
    "Chicago",
    "Beirut",
    "FrankFurt",
  ];

async function handleCart(fid) {
  try {
    const result =await axios.post(
      "http://localhost:8080/cart",
      { flightID: fid },
      {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
  setCartMessage(true);
  setTimeout(() => setCartMessage(false), 2000);
  } catch (error) {
    if(error.status==401){
      setWarning(true);
      setTimeout(() => setWarning(false), 2000);
    }
  }
}


  async function handleSearch() {
    setLoading(true);
    try {
      const results = await axios.post("http://localhost:8080/flight", 
        {
          departure,
          arrival,
          date
        },
      );
      setFlights(results.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const handleSort = (e) => {
    const sortBy = e.target.value;
    setSortOption(sortBy);

    let sortedFlights = [...flights];
    if (sortBy === "By Date") {
      sortedFlights.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    } else if (sortBy === "By Price") {
      sortedFlights.sort((a, b) => a.Price - b.Price);
    } else if (sortBy === "By Duration") {
      sortedFlights.sort((a, b) => a.Duration - b.Duration);
    }

    setFlights(sortedFlights);
  };
  const countriesFitlered = countries.filter((c) => c != departure);



  return (
    <div className="search-body">
       {warning && <div className='warning'>Flight already added!!</div>}
       {cartMessage && <div className='message'>{cartmessage}</div>}
      <center>
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 1.5 }}
        >
          Search for Amazing <span>Flights</span>
        </motion.h1>
      </center>

      <div className="results-c">
        <div className="topbar-search">
          <ul>
            <motion.li
              initial={{ x: -20 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <select
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              >
                <option value="" disabled>
                  Select Departure
                </option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </motion.li>

            <motion.li
              initial={{ x: -120 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <select
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
              >
                <option value="" disabled>
                  Select Arrival
                </option>
                {countriesFitlered.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </motion.li>

            <motion.li
              initial={{ x: -220 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            >
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </motion.li>

            <motion.li
              initial={{ x: -220 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            >
              <select name="Sort" value={sortOption} onChange={handleSort}>
                <option value="" disabled>
                  Sort By:
                </option>
                <option value="By Date">Date</option>
                <option value="By Price">Price</option>
                <option value="By Duration">Duration</option>
              </select>
            </motion.li>

            <motion.li
              initial={{ x: -220 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            >
              <motion.button whileTap={{ scale: 0.9 }} onClick={handleSearch}>
                Search
              </motion.button>
            </motion.li>
          </ul>
        </div>

        {loading ? (
          <center>
            <div className="loader"></div>
          </center>
        ) : (
          <div className="search-result">
          <Reorder.Group axis="y" values={flights} onReorder={setFlights}>
            {flights.map((flight) => 
              flight.flight_status === 'Full' ? (
                ""
              ) : (
                <Reorder.Item
                  key={flight.FlightId}
                  value={flight}
                  className="result-row"
                >
                  <span className="column from">
                    <strong>From:</strong> {flight.From}
                  </span>
                  <span className="column to">
                    <strong>To:</strong> {flight.To}
                  </span>
                  <span className="column date">
                    <strong>Date:</strong> {new Date(flight.Date).toLocaleDateString()}
                  </span>
                  <span className="column duration">
                    <strong>Duration:</strong> {flight.Duration} hrs
                  </span>
                  <span className="column price">
                    <strong>Price:</strong> ${flight.Price}
                  </span>
                  <span className="column action">
                    {userID ? (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCart(flight.FlightID)}
                      >
                        Add to Cart
                      </motion.button>
                    ) : (
                      <div></div>
                    )}
                  </span>
                </Reorder.Item>
              )
            )}
          </Reorder.Group>
        </div>        
        )}
      </div>
    </div>
  );
};

export default Search;
