const connection = require("../database/Mysql");

<<<<<<< HEAD
=======
/**
 * Check if a flight is already in the user's cart
 * @param {number} flightID - The ID of the flight
 * @param {number} userID - The ID of the user
 * @param {function} callback - Callback function to handle the result
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
const checkCart = (flightID, userID, callback) => {
  connection.query(
    "SELECT * FROM cart WHERE flightID = ? AND userID = ?",
    [flightID, userID],
    (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    }
  );
};

<<<<<<< HEAD
=======
/**
 * Add a flight to the user's cart
 * @param {number} flightID - The ID of the flight
 * @param {number} userID - The ID of the user
 * @param {function} callback - Callback function to handle the result
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
const addToCart = (flightID, userID, callback) => {
  connection.query(
    "INSERT INTO cart (flightID, userID) VALUES (?, ?)",
    [flightID, userID],
    (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null);
      }
    }
  );
};

<<<<<<< HEAD
=======
/**
 * Retrieve all flights in the user's cart
 * @param {number} userID - The ID of the user
 * @param {function} callback - Callback function to handle the result
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
const getCart = (userID, callback) => {
  connection.query(
    "SELECT flights.FLightID,flights.From, flights.To, flights.Date, flights.Duration, flights.Price FROM flights INNER JOIN cart ON flights.FlightID = cart.FlightID WHERE cart.userID = ? ",
    userID,
    (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    }
  );
};

<<<<<<< HEAD
=======
/**
 * Remove a flight from the user's cart
 * @param {number} flightID - The ID of the flight
 * @param {number} userID - The ID of the user
 * @param {function} callback - Callback function to handle the result
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
const deleteFromCart = (flightID, userID,callback) => {
  let sql = "DELETE FROM cart WHERE flightID=? AND userID=?";
  connection.query(sql, [flightID,userID], (err, result) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, result);
    }
  });
};
module.exports = { checkCart, addToCart, getCart,deleteFromCart };
