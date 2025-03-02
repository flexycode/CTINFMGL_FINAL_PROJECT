// Import required dependencies
const express = require("express");
const router = express.Router();
const userController = require("../controller/emailController");
const verifyToken = require("../auth/userAuth");

/**
 * Handles ticket confirmation requests
 * @route POST /
 * @access Private (requires authentication)
 * @description Processes ticket confirmation requests and sends email notifications
 */
router.post("/", verifyToken, userController.sendTicketConfirmation);

/**
 * Handles password reset requests
 * @route POST /forgotPass
 * @access Public
 * @description Processes password reset requests and sends new password via email
 */
router.post("/forgotPass", userController.resetPassword);

// Export the configured router for use in main application
module.exports = router;
