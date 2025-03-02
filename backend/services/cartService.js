// Import database connection module for MySQL operations
const connection = require("../database/Mysql");

/**
 * Checks if a flight exists in user's cart
 * @param {number} flightID - ID of the flight to check
 * @param {number} userID - ID of the user's cart to check
 * @param {function} callback - Callback function(err, result)
 */
const checkCart = (flightID, userID, callback) => {
  // Query checks for existing cart entry matching flight and user
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

/**
 * Adds a flight to user's cart
 * @param {number} flightID - ID of the flight to add
 * @param {number} userID - ID of the user's cart
 * @param {function} callback - Callback function(err)
 */
const addToCart = (flightID, userID, callback) => {
  // Insert new entry into cart table with provided flight and user IDs
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

/**
 * Retrieves all flights in user's cart
 * @param {number} userID - ID of the user whose cart to retrieve
 * @param {function} callback - Callback function(err, result)
 * @returns {object[]} Array of objects containing flight details
 */
const getCart = (userID, callback) => {
  // Join flights and cart tables to fetch detailed flight information
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

/**
 * Removes a flight from user's cart
 * @param {number} flightID - ID of the flight to remove
 * @param {number} userID - ID of the user's cart
 * @param {function} callback - Callback function(err, result)
 */
const deleteFromCart = (flightID, userID,callback) => {
  // SQL query to remove specified flight from user's cart
  let sql = "DELETE FROM cart WHERE flightID=? AND userID=?";
  connection.query(sql, [flightID,userID], (err, result) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, result);
    }
  });
};

// Export all cart operations for external use
module.exports = { checkCart, addToCart, getCart,deleteFromCart };
