<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


const verifyToken = (req, res, next) => {
   const token = req.header('authorization'); 

    if (!token) {
        return res.status(403).send("Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        if(decoded.role === "user"){
        next(); 
    }
    } catch (error) {
        res.status(401).send("Invalid token.");
=======
const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

/**
 * Middleware to verify the user's token.
 * Ensures the request has a valid JWT and the user's role is "user".
 */
const verifyToken = (req, res, next) => {
   const token = req.header('authorization');  // Get token from request header

    if (!token) {
        return res.status(403).send("Access denied. No token provided."); // Reject if no token
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token
        req.user = decoded;
        if(decoded.role === "user"){ 
        next(); // Allow access if role is "user"
    }
    // If role is not "user", simply exit
    } catch (error) {
        res.status(401).send("Invalid token."); // Reject if token is invalid
>>>>>>> 6153a59 (Added comments to backend code for better readability)
    }
};
  


<<<<<<< HEAD
module.exports = verifyToken;
=======
module.exports = verifyToken; // Export middleware
>>>>>>> 6153a59 (Added comments to backend code for better readability)
