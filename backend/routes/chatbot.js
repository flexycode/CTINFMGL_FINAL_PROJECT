// Import required dependencies
const express = require('express');
const chatgptController = require("../controller/chatbotController");
const router = express.Router();
const verifyToken = require("../auth/userAuth");

/**
 * Handles POST requests to get responses from ChatGPT
 * @route POST /getResponse
 * @access Private (requires authentication)
 * @description Processes requests to ChatGPT and returns responses
 */
router.post("/getResponse", verifyToken, chatgptController.chatgptController);

// Export the configured router for use in main application
module.exports = router;
