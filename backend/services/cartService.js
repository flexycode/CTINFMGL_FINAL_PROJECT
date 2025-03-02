const connection = require("../database/Mysql");

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
