const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cartService = require("../services/cartService");

dotenv.config();

<<<<<<< HEAD
=======

>>>>>>> 6153a59 (Added comments to backend code for better readability)
exports.addToCart = (req, res) => {
  const { flightID } = req.body;
  const token = req.header("authorization");
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

<<<<<<< HEAD
=======
  // Check if the flight is already in the user's cart
>>>>>>> 6153a59 (Added comments to backend code for better readability)
  cartService.checkCart(flightID, decoded.userID, (err, result) => {
    if (err) {
      return res.status(500).send("Internal error");
    }
    if (result.length > 0) {
      res.status(401).send("Already in cart");
    } else {
<<<<<<< HEAD
=======
      // Add flight to cart if it's not already there
>>>>>>> 6153a59 (Added comments to backend code for better readability)
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
<<<<<<< HEAD
  const token = req.header("authorization");
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
=======
  const token = req.header("authorization"); // Get token from request headers
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

 // Fetch the user's cart items
>>>>>>> 6153a59 (Added comments to backend code for better readability)
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

<<<<<<< HEAD
=======
   // Remove the specified flight from the user's cart
>>>>>>> 6153a59 (Added comments to backend code for better readability)
  cartService.deleteFromCart(flight_id, decoded.userID, (err, result) => {
    if (err) {
      res.status(500).send("Internal Error");
    }
    res.status(200).send("Deleted successfully");
  });
};
