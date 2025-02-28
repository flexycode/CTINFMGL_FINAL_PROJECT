const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cartService = require("../services/cartService");

dotenv.config();

exports.addToCart = (req, res) => {
  const { flightID } = req.body;
  const token = req.header("authorization");
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  cartService.checkCart(flightID, decoded.userID, (err, result) => {
    if (err) {
      return res.status(500).send("Internal error");
    }
    if (result.length > 0) {
      res.status(401).send("Already in cart");
    } else {
      cartService.addToCart(flightID, decoded.userID, (err, result) => {
        if (err) {
          res.status(500).send("Error inserting into the database");
        } else {
          res.send("Added to cart successfully");
        }
      });
    }
  });
};

exports.getCart = (req, res) => {
  const token = req.header("authorization");
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  cartService.getCart(decoded.userID, (err, result) => {
    if (err) {
      res.status(500).send("error inserting");
    } else {
      res.send(result);
    }
  });
};

exports.deleteFromCart = (req, res) => {
  const token = req.header("authorization");
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const { flight_id } = req.query;

  cartService.deleteFromCart(flight_id, decoded.userID, (err, result) => {
    if (err) {
      res.status(500).send("Internal Error");
    }
    res.status(200).send("Deleted successfully");
  });
};
