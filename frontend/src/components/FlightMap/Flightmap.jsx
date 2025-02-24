import { useState, useEffect } from "react";
import "./Flightmap.css";
import x from "../../images/x-symbol.svg";
import axios from "axios";

const Flightmap = ({ seat_ }) => {
  const [data, setData] = useState([]);
  const [seatId, setSeatId] = useState(
    () => localStorage.getItem("seatId") || "none"
  );
  const [clickedSeat, setClickedSeat] = useState(
    () => localStorage.getItem("clickedSeat") || "none"
  );
  const [price, setPrice] = useState(
    () => parseFloat(localStorage.getItem("price")) || 0
  );
  const [selectedMeal, setSelectedMeal] = useState(
    localStorage.getItem("meal") || "none"
  );
  const [sclass, setClass] = useState(localStorage.getItem("class") || "none");
  const [errorMessage, setErrorMessage] = useState("");

  const mealOptions = ["Beef", "Chicken", "Vegan"];

  useEffect(() => {
    getSeats();
  }, []);

  const getSeats = async () => {
    if (localStorage.getItem("fid") !== null) {
      try {
        const result = await axios.post(
          "http://localhost:8080/seat",
          {
            flightID: `${localStorage.getItem("fid")}`,
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("clickedSeat", clickedSeat);
    localStorage.setItem("meal", selectedMeal);
    localStorage.setItem("class", sclass);
    localStorage.setItem("price", price);
    localStorage.setItem("seatId", seatId);
  }, [clickedSeat, selectedMeal, sclass, price, seatId]);

  const handleClick = (seatId, price1, class_, id_) => {
    setClickedSeat(seatId);
    setPrice(price1);
    setClass(class_);
    setSeatId(id_);
    setErrorMessage(""); 
  };

  const handleClick1 = () => {
    if (clickedSeat === "none" || selectedMeal === "none") {
      setErrorMessage(
        "Please select a seat, meal before proceeding."
      );
      return;
    }
    setErrorMessage(""); 
    seat_(clickedSeat, price, selectedMeal, sclass);
  };

  const handleMealChange = (event) => {
    setSelectedMeal(event.target.value);
    setErrorMessage(""); 
  };

  const getSeatClass = (seat) => {
    if (seat.Status === "Booked") {
      return "seats occupied";
    } else if (seat.Class === "Premium") {
      return "seats premium available";
    } else if (seat.Class === "Economy") {
      return "seats economy available";
    }
  };

  return (
    <div className="flight-map">
      <div className="right-section">
        {data.length > 0 ? (
          data.map((seat) => (
            <div
              key={seat.SeatId}
              id={`seat${seat.SeatId}`}
              className={getSeatClass(seat)}
              onClick={() =>
                handleClick(
                  seat.SeatNumber,
                  seat.seat_price,
                  seat.Class,
                  seat.SeatId
                )
              }
              style={
                clickedSeat === seat.SeatId
                  ? { border: "3px solid black", scale: "1.1" }
                  : {}
              }
            >
              {seat.Status === "Booked" ? (
                <div>
                  <img
                    style={{
                      width: "80%",
                      margin: "auto",
                      transform: "translateY(1px)",
                    }}
                    src={x}
                    alt="Unavailable"
                  />
                </div>
              ) : (
                `Seat ${seat.SeatNumber}`
              )}
            </div>
          ))
        ) : (
          <p>Loading seats...</p>
        )}
      </div>
      <div className="left-section">
        <div className="description-flight">
          <div>Description: Select your seat</div>
          <div>Seat Selected: {clickedSeat}</div>
          <div>Price: {price} $</div>
          <select
            name="meal"
            id="meal"
            value={selectedMeal}
            onChange={handleMealChange}
          >
            <option value="" disabled>
              -Choose Your meal-
            </option>
            {mealOptions.map((meal) => (
              <option key={meal} value={meal}>
                {meal}
              </option>
            ))}
          </select>
          <div>
            <button onClick={handleClick1}>--Next--</button>
          </div>
          {errorMessage && (
            <h6 style={{ color: "red" }}>{errorMessage}</h6>
          )}
        </div>
        <table className="flightmap-table">
          <tbody>
            <tr>
              <td>
                <span className="blue">Blue</span>
              </td>
              <td>
                <span className="green">Green</span>
              </td>
              <td>
                <span className="red">Red</span>
              </td>
            </tr>
            <tr>
              <td>Premium</td>
              <td>Economy</td>
              <td>Occupied</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Flightmap;
