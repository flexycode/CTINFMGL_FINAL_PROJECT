const jwt = require("jsonwebtoken");
const flightService = require("../services/flightService");
const {
  passwordGenerator,
  renderTicketTemplate,
  sendTicketEmail,
  findUserByEmail,
  updateUserPassword,
  hashPassword,
} = require("../services/emailService");

<<<<<<< HEAD
=======
/**
 * Handles sending a ticket confirmation email to the user.
 * - Verifies user authentication using JWT.
 * - Retrieves flight details from the database.
 * - Generates a ticket template and sends it via email.
 */

>>>>>>> 6153a59 (Added comments to backend code for better readability)
exports.sendTicketConfirmation = (req, res) => {
  const token = req.header("authorization");
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const { flightId, date, price, seatNumber, seatClass } = req.body;
  const email = decoded.email;
  const name = decoded.username;

<<<<<<< HEAD
=======
    // Fetch flight details using flight ID
>>>>>>> 6153a59 (Added comments to backend code for better readability)
  flightService.getFlightName(flightId, (err, result) => {
    if (err) {
      return res.status(500).send({ success: false, error: "Database error" });
    }

    if (!result || result.length === 0) {
      return res.status(404).send({ success: false, error: "Flight not found" });
    }

<<<<<<< HEAD
    const { FlightID: id ,From: flightDeparture, To: flightArrival } = result[0];
    const templateData = { id,flightDeparture, flightArrival, name, email, date, price, seatNumber, seatClass };

=======
        // Extract flight details
    const { FlightID: id ,From: flightDeparture, To: flightArrival } = result[0];

       // Prepare ticket template data
    const templateData = { id,flightDeparture, flightArrival, name, email, date, price, seatNumber, seatClass };

        // Render ticket email template
>>>>>>> 6153a59 (Added comments to backend code for better readability)
    renderTicketTemplate(templateData, (err, renderedTemplate) => {
      if (err) {
        console.error("Error rendering EJS template:", err);
        return res.status(500).send({ success: false, error: "EJS render error" });
      }

<<<<<<< HEAD
=======
        // Send ticket confirmation email
>>>>>>> 6153a59 (Added comments to backend code for better readability)
      sendTicketEmail(email, "Ticket Confirmation", renderedTemplate, (err, result) => {
        if (err) {
          console.error("Error sending email:", err);
          return res.status(500).send({ success: false, error: err.message });
        }
        res.status(200).send({ success: true, result });
      });
    });
  });
};


<<<<<<< HEAD
exports.resetPassword = (req, res) => {
  const { email,username } = req.body;

=======
/**
 * Handles resetting a user's password.
 * - Finds the user by email and username.
 * - Generates a new password and hashes it.
 * - Updates the password in the database.
 * - Sends the new password via email.
 */

exports.resetPassword = (req, res) => {
  const { email,username } = req.body;

   // Find user by email and username in the database
>>>>>>> 6153a59 (Added comments to backend code for better readability)
  findUserByEmail(email,username, (err, result) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).send("Server error occurred.");
    }

    if (result.length === 0) {
      return res.status(404).send("Email not found.");
    }

    const newPassword = passwordGenerator();

<<<<<<< HEAD
=======
      // Hash the new password before storing it
>>>>>>> 6153a59 (Added comments to backend code for better readability)
    hashPassword(newPassword, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).send("Error hashing the password.");
      }

<<<<<<< HEAD
=======
      // Update the user's password in the database
>>>>>>> 6153a59 (Added comments to backend code for better readability)
      updateUserPassword(result[0].userID, hashedPassword, (err) => {
        if (err) {
          console.error("Error updating the password in the database:", err);
          return res.status(500).send("Error updating the password.");
        }

<<<<<<< HEAD
=======

        // Send the new password to the user via email
>>>>>>> 6153a59 (Added comments to backend code for better readability)
        sendTicketEmail(email, "Password reset", `Your new password is: ${newPassword}`, (err) => {
          if (err) {
            console.error("Error sending email:", err);
            return res.status(500).send("Failed to send the email.");
          }

          res.status(200).send("Password reset successfully. Check your email for the new password.");
        });
      });
    });
  });
};
