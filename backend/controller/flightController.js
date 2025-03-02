const flightService = require("../services/flightService");

<<<<<<< HEAD
=======
/**
 * Retrieves available flights based on user input.
 * - Extracts departure, arrival, and date from the request body.
 * - Calls the flight service to fetch flights.
 * - Returns flight details or handles errors.
 */

>>>>>>> 6153a59 (Added comments to backend code for better readability)
exports.getFlights = (req, res) => {
  const { departure, arrival, date } = req.body;

  flightService.getFlightsService(departure, arrival, date, (err, results) => {
    if (err) {
      console.error("Error fetching flights:", err);
      return res.status(500).send("An error occurred while fetching the flights.");
    }
    res.send(results);
  });
};

<<<<<<< HEAD
exports.addFlight = (req, res) => {
  const { from, to, date, duration, price } = req.body;

=======
/**
 * Adds a new flight to the system.
 * - Extracts flight details from the request body.
 * - Calls the flight service to add the flight.
 * - Retrieves the newly created flight ID.
 * - Adds seats for the flight.
 * - Returns a success message or handles errors.
 */

exports.addFlight = (req, res) => {
  const { from, to, date, duration, price } = req.body;

  // Add the flight to the database
>>>>>>> 6153a59 (Added comments to backend code for better readability)
  flightService.addFlightService({ from, to, date, duration, price }, (err) => {
    if (err) {
      console.error("Error adding flight:", err);
      return res.status(500).send("Error adding flight");
    }

<<<<<<< HEAD
=======
  // Retrieve the latest flight ID after insertion
>>>>>>> 6153a59 (Added comments to backend code for better readability)
    flightService.getLatestFlightId((err, flightID) => {
      if (err) {
        console.error("Error retrieving flight ID:", err);
        return res.status(500).send("Error retrieving flight ID");
      }

<<<<<<< HEAD
=======
  // Add seats for the newly added flight

>>>>>>> 6153a59 (Added comments to backend code for better readability)
      flightService.addSeatsService(flightID, (err) => {
        if (err) {
          console.error("Error adding seats:", err);
          return res.status(500).send("Error adding seats");
        }

        res.send("Flight and seats added successfully");
      });
    });
  });
};
