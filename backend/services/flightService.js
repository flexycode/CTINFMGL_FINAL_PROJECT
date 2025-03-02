const connection = require("../database/Mysql");

/**
 * Retrieves flight information based on optional filtering criteria
 * @param {string} departure - Departure airport/city
 * @param {string} arrival - Arrival airport/city
 * @param {string} date - Flight date
 * @param {Function} callback - Callback function to handle response/error
 * @returns {void} Executes callback with either error or flight results
 */
exports.getFlightsService = (departure, arrival, date, callback) => {
  // Dynamically construct SQL query based on provided filter parameters
  const sql = departure && arrival && date
    ? "SELECT * FROM flights WHERE `From` = ? AND `To` = ? AND `Date` = ?"
    : "SELECT * FROM flights";

  // Prepare query parameters array based on available filters
  const params = departure && arrival && date ? [departure, arrival, date] : [];

  connection.query(sql, params, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

/**
 * Retrieves flight details by ID
 * @param {number|string} flightId - Unique identifier for the flight
 * @param {Function} callback - Callback function to handle response/error
 * @returns {void} Executes callback with either error or flight details
 */
exports.getFlightName = (flightId, callback) => {
  connection.query('Select * from flights where flightId=?', [flightId], (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });
};

/**
 * Creates a new flight entry in the database
 * @param {Object} flightDetails - Flight information object
 * @param {string} flightDetails.from - Departure airport/city
 * @param {string} flightDetails.to - Arrival airport/city
 * @param {string} flightDetails.date - Flight date
 * @param {string} flightDetails.duration - Flight duration
 * @param {number} flightDetails.price - Base ticket price
 * @param {Function} callback - Callback function to handle response/error
 * @returns {void} Executes callback with either error or insertion results
 */
exports.addFlightService = (flightDetails, callback) => {
  const { from, to, date, duration, price } = flightDetails;

  // Prepare INSERT statement with initial status set to "Available"
  const sql =
    'INSERT INTO flights (`From`, `To`, `Date`, `Duration`, `Price`, `flight_status`) VALUES (?, ?, ?, ?, ?, "Available")';

  connection.query(sql, [from, to, date, duration, price], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

/**
 * Retrieves the latest flight ID from the database
 * @param {Function} callback - Callback function to handle response/error
 * @returns {void} Executes callback with either error or latest FlightID
 */
exports.getLatestFlightId = (callback) => {
  const sql = "SELECT FlightID FROM flights ORDER BY FlightID DESC LIMIT 1";

  connection.query(sql, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results[0].FlightID);
  });
};

/**
 * Initializes seat configuration for a newly added flight
 * @param {number|string} flightID - Unique identifier for the flight
 * @param {Function} callback - Callback function to handle response/error
 * @returns {void} Executes callback with either error or insertion results
 */
exports.addSeatsService = (flightID, callback) => {
  // Bulk insert statement for initializing seats with alternating availability
  const seatInsertionSql = `
    INSERT INTO seats (FlightID, SeatNumber, Class, Status, seat_price) VALUES
    (${flightID}, 1, 'Economy', 'Available', 100), (${flightID}, 2, 'Economy', 'Booked', 100),
    (${flightID}, 3, 'Economy', 'Available', 100), (${flightID}, 4, 'Economy', 'Booked', 100),
    (${flightID}, 5, 'Economy', 'Available', 100), (${flightID}, 6, 'Economy', 'Booked', 100),
    (${flightID}, 7, 'Economy', 'Available', 100), (${flightID}, 8, 'Economy', 'Booked', 100),
    (${flightID}, 9, 'Economy', 'Available', 100), (${flightID}, 10, 'Economy', 'Booked', 100),
    (${flightID}, 11, 'Economy', 'Available', 100), (${flightID}, 12, 'Economy', 'Booked', 100),
    (${flightID}, 13, 'Premium', 'Available', 450), (${flightID}, 14, 'Premium', 'Booked', 450),
    (${flightID}, 15, 'Premium', 'Available', 450), (${flightID}, 16, 'Premium', 'Booked', 450),
    (${flightID}, 17, 'Premium', 'Available', 450), (${flightID}, 18, 'Premium', 'Booked', 450),
    (${flightID}, 19, 'Premium', 'Available', 450), (${flightID}, 20, 'Premium', 'Booked', 450),
    (${flightID}, 21, 'Premium', 'Available', 450), (${flightID}, 22, 'Premium', 'Booked', 450),
    (${flightID}, 23, 'Premium', 'Available', 450), (${flightID}, 24, 'Premium', 'Booked', 450)
  `;

  connection.query(seatInsertionSql, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};
