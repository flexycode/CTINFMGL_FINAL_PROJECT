// Import flight service module for database operations
const flightService = require("../services/flightService");

/**
 * Handles GET request to retrieve flights based on search criteria
 * @param {Object} req - Express request object containing search parameters
 * @param {Object} req.body - Request body containing flight search criteria
 * @param {string} req.body.departure - Departure airport code
 * @param {string} req.body.arrival - Arrival airport code
 * @param {string} req.body.date - Travel date
 * @param {Object} res - Express response object
 */
exports.getFlights = (req, res) => {
  // Extract search parameters from request body
  const { departure, arrival, date } = req.body;

  /**
   * Query flight service to retrieve flights matching search criteria
   * @callback getFlightsCallback
   * @param {Error|null} err - Database error if occurs
   * @param {Array} results - Array of matching flight records
   */
  flightService.getFlightsService(departure, arrival, date, (err, results) => {
    // Handle database query errors
    if (err) {
      console.error("Error fetching flights:", err);
      return res.status(500).send("An error occurred while fetching the flights.");
    }
    
    // Return successful response with flight data
    res.send(results);
  });
};

/**
 * Handles POST request to add a new flight with associated seats
 * @param {Object} req - Express request object containing flight details
 * @param {Object} req.body - Request body containing flight information
 * @param {string} req.body.from - Departure airport code
 * @param {string} req.body.to - Arrival airport code
 * @param {string} req.body.date - Flight date
 * @param {string|number} req.body.duration - Flight duration
 * @param {number|string} req.body.price - Flight price
 * @param {Object} res - Express response object
 */
exports.addFlight = (req, res) => {
  // Extract flight details from request body
  const { from, to, date, duration, price } = req.body;

  /**
   * Add new flight to the database
   * @callback addFlightCallback
   * @param {Error|null} err - Database error if occurs
   */
  flightService.addFlightService({ from, to, date, duration, price }, (err) => {
    // Handle flight addition errors
    if (err) {
      console.error("Error adding flight:", err);
      return res.status(500).send("Error adding flight");
    }

    /**
     * Retrieve the ID of the newly added flight
     * @callback getLatestFlightIdCallback
     * @param {Error|null} err - Database error if occurs
     * @param {number|string} flightID - ID of the newly added flight
     */
    flightService.getLatestFlightId((err, flightID) => {
      // Handle flight ID retrieval errors
      if (err) {
        console.error("Error retrieving flight ID:", err);
        return res.status(500).send("Error retrieving flight ID");
      }

      /**
       * Initialize seats for the newly added flight
       * @callback addSeatsCallback
       * @param {Error|null} err - Database error if occurs
       */
      flightService.addSeatsService(flightID, (err) => {
        // Handle seat addition errors
        if (err) {
          console.error("Error adding seats:", err);
          return res.status(500).send("Error adding seats");
        }

        // Return success response after all operations complete
        res.send("Flight and seats added successfully");
      });
    });
  });
};
