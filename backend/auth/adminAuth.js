const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

<<<<<<< HEAD
dotenv.config();

const verifyAdmin = (req, res, next)=>{
    const token = req.header('authorization'); 
=======
// Load environment variables from .env file
dotenv.config();

/**
 * Middleware to verify if the user has admin privileges.
 * It checks for a valid JWT token and verifies if the user role is 'admin'.
 */
const verifyAdmin = (req, res, next)=>{
    const token = req.header('authorization');  // Get token from request header
>>>>>>> 6153a59 (Added comments to backend code for better readability)

    if(!token){
        return res.status(403).send("Access denied. No token provided.");
    }
    try {
<<<<<<< HEAD
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        if(decoded.role==="admin"){
        next(); 
=======
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify token
        req.user = decoded; // Attach user data to request
        if(decoded.role==="admin"){  
        next(); // Allow access
>>>>>>> 6153a59 (Added comments to backend code for better readability)
        }
        else {
            return res.status(403).send("Access denied. Admin privileges required.");
        }
    } catch (error) {
<<<<<<< HEAD
        res.status(401).send("Invalid token.");
=======
        res.status(401).send("Invalid token."); 
>>>>>>> 6153a59 (Added comments to backend code for better readability)
    }

}

<<<<<<< HEAD
module.exports=verifyAdmin;
=======
module.exports=verifyAdmin; // Export middleware
>>>>>>> 6153a59 (Added comments to backend code for better readability)
