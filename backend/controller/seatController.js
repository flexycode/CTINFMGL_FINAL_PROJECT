const seatService = require("../services/seatService");

<<<<<<< HEAD
=======
/**
 * Retrieves all available seats for a given flight.
 * - Extracts the flight ID from the request body.
 * - Calls the seat service to fetch seat details.
 * - Returns the seat data or handles errors.
 */

>>>>>>> 6153a59 (Added comments to backend code for better readability)
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

<<<<<<< HEAD
=======
/**
 * Books a seat for a flight and updates the flight status if necessary.
 * - Updates the status of the selected seat to "Booked."
 * - Checks if all seats for the flight are booked.
 * - If all seats are booked, marks the flight as "Full" and removes it from carts.
 * - Sends appropriate responses based on seat availability.
 */

>>>>>>> 6153a59 (Added comments to backend code for better readability)
exports.addSeat = (req, res) => {
  const { seatID, flightID } = req.body;
  const fullStatus = "Full";

<<<<<<< HEAD
=======
  // Update seat status to "Booked"
>>>>>>> 6153a59 (Added comments to backend code for better readability)
  seatService.updateSeatStatus(seatID, (err, seatResults) => {
    if (err) {
      console.error("Error updating seat status:", err);
      return res.status(500).send("Error updating seat status.");
    }

    if (seatResults.affectedRows === 0) {
      return res.status(404).send("Seat not found or already booked.");
    }

<<<<<<< HEAD
=======
  // Retrieve the booking status of all seats for the given flight
>>>>>>> 6153a59 (Added comments to backend code for better readability)
    seatService.getFlightSeatStatuses(flightID, (err, seatStatuses) => {
      if (err) {
        console.error("Error checking seat statuses:", err);
        return res.status(500).send("Error checking seat statuses.");
      }

<<<<<<< HEAD
=======
  // Check if all seats for the flight are booked
>>>>>>> 6153a59 (Added comments to backend code for better readability)
      const allSeatsBooked = seatStatuses.every(
        (seat) => seat.Status === "Booked"
      );

      if (allSeatsBooked) {
<<<<<<< HEAD
=======
          // If all seats are booked, mark the flight as "Full"
>>>>>>> 6153a59 (Added comments to backend code for better readability)
        seatService.updateFlightStatus(flightID, fullStatus, (err) => {
          if (err) {
            console.error("Error updating flight status:", err);
            return res.status(500).send("Error updating flight status.");
          }

<<<<<<< HEAD
=======
          // Remove the flight from users' carts since it's fully booked
>>>>>>> 6153a59 (Added comments to backend code for better readability)
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
