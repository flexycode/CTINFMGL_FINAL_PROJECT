const connection = require("../database/Mysql");

/**
 * Retrieves detailed seat information for a specific flight
 * @param {number|string} flightID - Unique identifier for the flight
 * @param {Function} callback - Callback function to handle response/error
 * @returns {void} Executes callback with either error or array of seat objects
 * @example
 * // Returns array of objects with seat details:
 * // {
 * //   SeatId: number,
 * //   SeatNumber: number,
 * //   Class: string,
 * //   Status: string,
 * //   price: number,
 * //   seat_price: number
 * // }
 */
exports.getSeatsService = (flightID, callback) => {
  // Join flights and seats tables to get comprehensive seat information
  const sql =
    "SELECT SeatId, SeatNumber, Class, Status, price, seat_price FROM flights f INNER JOIN seats s ON f.FlightID = s.FlightID WHERE s.FlightID = ?";

  connection.query(sql, [flightID], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

/**
 * Updates the status of a specific seat to 'Booked'
 * @param {number|string} seatID - Unique identifier for the seat
 * @param {Function} callback - Callback function to handle response/error
 * @returns {void} Executes callback with either error or update results
 */
exports.updateSeatStatus = (seatID, callback) => {
  // Simple update statement to mark a seat as booked
  const sql = "UPDATE seats SET Status = 'Booked' WHERE SeatID = ?";

  connection.query(sql, [seatID], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

/**
 * Retrieves the status of all seats for a specific flight
 * @param {number|string} flightID - Unique identifier for the flight
 * @param {Function} callback - Callback function to handle response/error
 * @returns {void} Executes callback with either error or array of seat status objects
 * @example
 * // Returns array of objects with seat status:
 * // {
 * //   Status: string  // 'Available' or 'Booked'
 * // }
 */
exports.getFlightSeatStatuses = (flightID, callback) => {
  // Query to get status of all seats for a flight
  const sql = "SELECT Status FROM seats WHERE FlightID = ?";

  connection.query(sql, [flightID], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

/**
 * Updates the status of a flight
 * @param {number|string} flightID - Unique identifier for the flight
 * @param {string} status - New status for the flight (e.g., 'Available', 'Departed', 'Cancelled')
 * @param {Function} callback - Callback function to handle response/error
 * @returns {void} Executes callback with either error or update results
 */
exports.updateFlightStatus = (flightID, status, callback) => {
  // Update statement to change flight status
  const sql = "UPDATE flights SET flight_status = ? WHERE FlightID = ?";

  connection.query(sql, [status, flightID], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

/**
 * Removes a flight from the cart
 * @param {number|string} flightID - Unique identifier for the flight
 * @param {Function} callback - Callback function to handle response/error
 * @returns {void} Executes callback with either error or deletion results
 */
exports.deleteFromCart = (flightID, callback) => {
  // Delete statement to remove flight from cart
  const sql = "DELETE FROM cart WHERE FlightID = ?";

  connection.query(sql, [flightID], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};
