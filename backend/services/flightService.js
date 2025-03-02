const connection = require("../database/Mysql");

exports.getFlightsService = (departure, arrival, date, callback) => {
  const sql = departure && arrival && date
    ? "SELECT * FROM flights WHERE `From` = ? AND `To` = ? AND `Date` = ?"
    : "SELECT * FROM flights";

  const params = departure && arrival && date ? [departure, arrival, date] : [];

  connection.query(sql, params, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

exports.getFlightName = (flightId,callback) =>{
  connection.query('Select * from flights where flightId=?',[flightId],(err,result)=>{
    if(err){
      return callback(err);
    }
    return callback(null,result);
  })
}

exports.addFlightService = (flightDetails, callback) => {
  const { from, to, date, duration, price } = flightDetails;

  const sql =
    'INSERT INTO flights (`From`, `To`, `Date`, `Duration`, `Price`, `flight_status`) VALUES (?, ?, ?, ?, ?, "Available")';

  connection.query(sql, [from, to, date, duration, price], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

exports.getLatestFlightId = (callback) => {
  const sql = "SELECT FlightID FROM flights ORDER BY FlightID DESC LIMIT 1";

  connection.query(sql, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results[0].FlightID);
  });
};

exports.addSeatsService = (flightID, callback) => {
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
