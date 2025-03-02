// Import required dependencies
const express = require("express");
const router = express.Router();
const { getSeats, addSeat } = require("../controller/seatController");
const verifyToken = require("../auth/userAuth");

/**
 * Handles GET requests to retrieve seat information
 * @route POST /
 * @access Private (requires authentication)
 * @description Returns available seat information for the authenticated user
 */
router.post("/", verifyToken, getSeats);

/**
 * Handles PUT requests to book a seat
 * @route PUT /addSeat
 * @access Private (requires authentication)
 * @description Updates seat status to 'Booked' for the specified seat
 */
router.put("/addSeat", verifyToken, addSeat);

// router.put("/addSeat", (req, res) => {
//   const { seatID } = req.body;

//   const sql = "UPDATE seats SET Status = 'Booked' WHERE SeatID = ?";

//   connection.query(sql, [seatID], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Error updating seat status.");
//     }

//     if (results.affectedRows === 0) {
//       return res.status(404).send("Seat not found or already booked.");
//     }

//     res.send("Seat status updated to 'Booked' successfully.");
//   });
// });

// Export the configured router for use in main application
module.exports = router;
