// Import required dependencies for routing configuration
const express = require("express");
const { register, login, getProfile, updateProfile} = require("../controller/userController");
const verifyToken = require("../auth/userAuth");
const router = express.Router();

// Define registration endpoint for creating new user accounts
router.post("/register", register);

// Handle user authentication requests
router.post("/login", login);

// Protected endpoint to fetch authenticated user's profile data
router.get("/getProfile", verifyToken, getProfile);

// Protected endpoint to modify authenticated user's profile information
router.put("/updateProfile", verifyToken, updateProfile);

// Export configured router for application integration
module.exports = router;
