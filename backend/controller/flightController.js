const flightService = require("../services/flightService");

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

exports.addFlight = (req, res) => {
  const { from, to, date, duration, price } = req.body;

  flightService.addFlightService({ from, to, date, duration, price }, (err) => {
    if (err) {
      console.error("Error adding flight:", err);
      return res.status(500).send("Error adding flight");
    }

    flightService.getLatestFlightId((err, flightID) => {
      if (err) {
        console.error("Error retrieving flight ID:", err);
        return res.status(500).send("Error retrieving flight ID");
      }

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
