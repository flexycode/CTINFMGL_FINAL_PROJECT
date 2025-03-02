const connection = require("../database/Mysql");

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

exports.updateSeatStatus = (seatID, callback) => {
  const sql = "UPDATE seats SET Status = 'Booked' WHERE SeatID = ?";

  connection.query(sql, [seatID], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

exports.getFlightSeatStatuses = (flightID, callback) => {
  const sql = "SELECT Status FROM seats WHERE FlightID = ?";

  connection.query(sql, [flightID], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

exports.updateFlightStatus = (flightID, status, callback) => {
  const sql = "UPDATE flights SET flight_status = ? WHERE FlightID = ?";

  connection.query(sql, [status, flightID], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

exports.deleteFromCart = (flightID, callback) => {
  const sql = "DELETE FROM cart WHERE FlightID = ?";

  connection.query(sql, [flightID], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};
