// Import required dependencies
const express = require('express');
const router = express.Router();
const verifyAdmin = require('../auth/adminAuth');
const { getFlights, addFlight } = require('../controller/flightController');

/**
 * Handles flight information retrieval
 * @route POST /
 * @access Public
 * @description Returns available flight information
 */
router.post("/", getFlights);

/**
 * Handles adding new flights to the system
 * @route POST /addFlight
 * @access Private (requires admin authentication)
 * @description Creates a new flight entry in the database
 */
router.post("/addFlight", verifyAdmin, addFlight);

// Export the configured router for use in main application
module.exports = router;
