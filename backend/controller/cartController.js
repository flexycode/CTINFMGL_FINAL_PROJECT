const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cartService = require("../services/cartService");

dotenv.config();

/**
 * Adds a flight to the user's cart
 * @param {Object} req - Express request object containing flightID in body and authorization token in headers
 * @param {Object} res - Express response object for sending responses
 */
exports.addToCart = (req, res) => {
  // Extract flight ID from request body
  const { flightID } = req.body;
  
  // Get authorization token from request headers
  const token = req.header("authorization");
  
  // Verify JWT token and extract user information
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  // Check if flight already exists in cart
  cartService.checkCart(flightID, decoded.userID, (err, result) => {
    if (err) {
      // Handle database or service errors
      return res.status(500).send("Internal error");
    }
    if (result.length > 0) {
      // Prevent duplicate items in cart
      res.status(401).send("Already in cart");
    } else {
      // Add new flight to cart
      cartService.addToCart(flightID, decoded.userID, (err, result) => {
        if (err) {
          // Handle database insertion errors
          res.status(500).send("Error inserting into the database");
        } else {
          // Confirm successful addition
          res.send("Added to cart successfully");
        }
      });
    }
  });
};

/**
 * Retrieves all flights in the user's cart
 * @param {Object} req - Express request object containing authorization token in headers
 * @param {Object} res - Express response object for sending responses
 */
exports.getCart = (req, res) => {
  // Get authorization token from request headers
  const token = req.header("authorization");
  
  // Verify JWT token and extract user information
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
  // Fetch cart contents for the user
  cartService.getCart(decoded.userID, (err, result) => {
    if (err) {
      // Handle database or service errors
      res.status(500).send("error inserting");
    } else {
      // Return cart contents
      res.send(result);
    }
  });
};

/**
 * Removes a flight from the user's cart
 * @param {Object} req - Express request object containing flight_id in query parameters and authorization token in headers
 * @param {Object} res - Express response object for sending responses
 */
exports.deleteFromCart = (req, res) => {
  // Get authorization token from request headers
  const token = req.header("authorization");
  
  // Verify JWT token and extract user information
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
  // Extract flight ID from query parameters
  const { flight_id } = req.query;

  // Remove flight from cart
  cartService.deleteFromCart(flight_id, decoded.userID, (err, result) => {
    if (err) {
      // Handle database or service errors
      res.status(500).send("Internal Error");
    }
    // Confirm successful deletion
    res.status(200).send("Deleted successfully");
  });
};
