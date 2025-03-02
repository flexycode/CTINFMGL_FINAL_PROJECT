// Import required dependencies
const express = require("express");
const verifyToken = require("../auth/userAuth");
const router = express.Router();
const { addToCart, getCart, deleteFromCart } = require("../controller/cartController");

/**
 * Handles adding items to user's cart
 * @route POST /
 * @access Private (requires authentication)
 * @description Adds a new item to the authenticated user's shopping cart
 */
router.post("/", verifyToken, addToCart);

/**
 * Handles retrieving all items in user's cart
 * @route GET /getall
 * @access Private (requires authentication)
 * @description Returns all items currently in the authenticated user's cart
 */
router.get("/getall", verifyToken, getCart);

/**
 * Handles removing items from user's cart
 * @route DELETE /delete
 * @access Private (requires authentication)
 * @description Removes specified items from the authenticated user's cart
 */
router.delete("/delete", verifyToken, deleteFromCart);

// Export the configured router for use in main application
module.exports = router;
