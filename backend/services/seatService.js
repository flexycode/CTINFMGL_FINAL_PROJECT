const connection = require("../database/Mysql");

<<<<<<< HEAD
=======
/**
 * Retrieves all seats for a specific flight, including seat details and pricing.
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
exports.getSeatsService = (flightID, callback) => {
  const sql =
    "SELECT SeatId, SeatNumber, Class, Status, price, seat_price FROM flights f INNER JOIN seats s ON f.FlightID = s.FlightID WHERE s.FlightID = ?";

  connection.query(sql, [flightID], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

<<<<<<< HEAD
=======
/**
 * Updates the status of a specific seat to 'Booked' in the database.
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
exports.updateSeatStatus = (seatID, callback) => {
  const sql = "UPDATE seats SET Status = 'Booked' WHERE SeatID = ?";

  connection.query(sql, [seatID], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

<<<<<<< HEAD
=======
/**
 * Retrieves the booking status of all seats for a specific flight.
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
exports.getFlightSeatStatuses = (flightID, callback) => {
  const sql = "SELECT Status FROM seats WHERE FlightID = ?";

  connection.query(sql, [flightID], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

<<<<<<< HEAD
=======
/**
 * Updates the overall flight status (e.g., Available, Full, Canceled).
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
exports.updateFlightStatus = (flightID, status, callback) => {
  const sql = "UPDATE flights SET flight_status = ? WHERE FlightID = ?";

  connection.query(sql, [status, flightID], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

<<<<<<< HEAD
=======
/**
 * Deletes all cart entries related to a specific flight.
 * This ensures users can no longer hold seats for a canceled flight.
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
exports.deleteFromCart = (flightID, callback) => {
  const sql = "DELETE FROM cart WHERE FlightID = ?";

  connection.query(sql, [flightID], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};
