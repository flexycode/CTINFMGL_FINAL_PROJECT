const seatService = require("../services/seatService");

exports.getSeats = (req, res) => {
  const { flightID } = req.body;

  seatService.getSeatsService(flightID, (err, results) => {
    if (err) {
      console.error("Error fetching seats:", err);
      return res.status(500).send("Error fetching seats.");
    }
    res.send(results);
  });
};

exports.addSeat = (req, res) => {
  const { seatID, flightID } = req.body;
  const fullStatus = "Full";

  seatService.updateSeatStatus(seatID, (err, seatResults) => {
    if (err) {
      console.error("Error updating seat status:", err);
      return res.status(500).send("Error updating seat status.");
    }

    if (seatResults.affectedRows === 0) {
      return res.status(404).send("Seat not found or already booked.");
    }

    seatService.getFlightSeatStatuses(flightID, (err, seatStatuses) => {
      if (err) {
        console.error("Error checking seat statuses:", err);
        return res.status(500).send("Error checking seat statuses.");
      }

      const allSeatsBooked = seatStatuses.every(
        (seat) => seat.Status === "Booked"
      );

      if (allSeatsBooked) {
        seatService.updateFlightStatus(flightID, fullStatus, (err) => {
          if (err) {
            console.error("Error updating flight status:", err);
            return res.status(500).send("Error updating flight status.");
          }

          seatService.deleteFromCart(flightID, (err) => {
            if (err) {
              console.error("Error deleting flight from carts:", err);
              return res.status(500).send("Error deleting flight from carts.");
            }

            res.send(
              "Seat booked, flight marked 'Full', and removed from carts."
            );
          });
        });
      } else {
        res.send("Seat status updated to 'Booked'.");
      }
    });
  });
};
