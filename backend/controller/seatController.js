// Import seat service module for seat-related database operations
const seatService = require("../services/seatService");

/**
 * Handles GET request to retrieve seats for a specific flight
 * @param {Object} req - Express request object containing flight identifier
 * @param {Object} req.body - Request body containing flight details
 * @param {number|string} req.body.flightID - Unique identifier for the flight
 * @param {Object} res - Express response object
 */
exports.getSeats = (req, res) => {
  // Extract flight identifier from request body
  const { flightID } = req.body;

  /**
   * Query seat service to retrieve all seats for the specified flight
   * @callback getSeatsCallback
   * @param {Error|null} err - Database error if occurs
   * @param {Array} results - Array of seat records for the flight
   */
  seatService.getSeatsService(flightID, (err, results) => {
    // Handle database query errors
    if (err) {
      console.error("Error fetching seats:", err);
      return res.status(500).send("Error fetching seats.");
    }
    
    // Return successful response with seat data
    res.send(results);
  });
};

/**
 * Handles POST request to book a seat and manage flight status
 * @param {Object} req - Express request object containing seat booking details
 * @param {Object} req.body - Request body containing seat and flight information
 * @param {number|string} req.body.seatID - Unique identifier for the seat
 * @param {number|string} req.body.flightID - Unique identifier for the flight
 * @param {Object} res - Express response object
 */
exports.addSeat = (req, res) => {
  // Extract seat and flight identifiers from request body
  const { seatID, flightID } = req.body;
  const fullStatus = "Full";

  /**
   * Update the status of the specified seat to "Booked"
   * @callback updateSeatStatusCallback
   * @param {Error|null} err - Database error if occurs
   * @param {Object} seatResults - Results of seat status update operation
   */
  seatService.updateSeatStatus(seatID, (err, seatResults) => {
    // Handle seat status update errors
    if (err) {
      console.error("Error updating seat status:", err);
      return res.status(500).send("Error updating seat status.");
    }

    // Check if seat exists and wasn't already booked
    if (seatResults.affectedRows === 0) {
      return res.status(404).send("Seat not found or already booked.");
    }

    /**
     * Retrieve current status of all seats for the flight
     * @callback getFlightSeatStatusesCallback
     * @param {Error|null} err - Database error if occurs
     * @param {Array} seatStatuses - Array of seat status records
     */
    seatService.getFlightSeatStatuses(flightID, (err, seatStatuses) => {
      // Handle seat status retrieval errors
      if (err) {
        console.error("Error checking seat statuses:", err);
        return res.status(500).send("Error checking seat statuses.");
      }

      // Check if all seats are now booked
      const allSeatsBooked = seatStatuses.every(
        (seat) => seat.Status === "Booked"
      );

      // If all seats are booked, perform additional operations
      if (allSeatsBooked) {
        /**
         * Update flight status to "Full"
         * @callback updateFlightStatusCallback
         * @param {Error|null} err - Database error if occurs
         */
        seatService.updateFlightStatus(flightID, fullStatus, (err) => {
          // Handle flight status update errors
          if (err) {
            console.error("Error updating flight status:", err);
            return res.status(500).send("Error updating flight status.");
          }

          /**
           * Remove flight from all shopping carts since it's now full
           * @callback deleteFromCartCallback
           * @param {Error|null} err - Database error if occurs
           */
          seatService.deleteFromCart(flightID, (err) => {
            // Handle cart deletion errors
            if (err) {
              console.error("Error deleting flight from carts:", err);
              return res.status(500).send("Error deleting flight from carts.");
            }

            // Return success response for full flight scenario
            res.send(
              "Seat booked, flight marked 'Full', and removed from carts."
            );
          });
        });
      } else {
        // Return success response for partial booking scenario
        res.send("Seat status updated to 'Booked'.");
      }
    });
  });
};
