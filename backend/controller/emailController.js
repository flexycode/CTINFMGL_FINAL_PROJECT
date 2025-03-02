// Import required dependencies
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

/**
 * Handles ticket confirmation by generating and emailing a ticket template
 * @param {Object} req - Express request object containing authorization header and ticket details
 * @param {string} req.header.authorization - JWT token for authentication
 * @param {Object} req.body - Request body containing flight booking information
 * @param {string|number} req.body.flightId - Unique identifier for the flight
 * @param {string} req.body.date - Travel date
 * @param {number|string} req.body.price - Ticket price
 * @param {string|number} req.body.seatNumber - Seat number assigned
 * @param {string} req.body.seatClass - Class of travel
 * @param {Object} res - Express response object
 */
exports.sendTicketConfirmation = (req, res) => {
  // Extract JWT token from authorization header
  const token = req.header("authorization");
  
  // Verify JWT token and extract user data
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
  // Destructure flight booking details from request body
  const { flightId, date, price, seatNumber, seatClass } = req.body;
  
  // Extract user credentials from decoded token
  const email = decoded.email;
  const name = decoded.username;

  /**
   * Get flight details from database
   * @callback getFlightCallback
   * @param {Error|null} err - Database error if occurs
   * @param {Array} result - Flight information array
   */
  flightService.getFlightName(flightId, (err, result) => {
    // Handle database errors
    if (err) {
      return res.status(500).send({ success: false, error: "Database error" });
    }

    // Validate flight existence
    if (!result || result.length === 0) {
      return res.status(404).send({ success: false, error: "Flight not found" });
    }

    // Extract flight details from database result
    const { FlightID: id, From: flightDeparture, To: flightArrival } = result[0];

    // Prepare template data for ticket generation
    const templateData = { 
      id, 
      flightDeparture, 
      flightArrival, 
      name, 
      email, 
      date, 
      price, 
      seatNumber, 
      seatClass 
    };

    /**
     * Render ticket template using provided data
     * @callback renderTemplateCallback
     * @param {Error|null} err - Template rendering error if occurs
     * @param {string} renderedTemplate - Generated HTML template
     */
    renderTicketTemplate(templateData, (err, renderedTemplate) => {
      // Handle template rendering errors
      if (err) {
        console.error("Error rendering EJS template:", err);
        return res.status(500).send({ success: false, error: "EJS render error" });
      }

      /**
       * Send ticket confirmation email to passenger
       * @callback sendEmailCallback
       * @param {Error|null} err - Email sending error if occurs
       * @param {*} result - Email delivery result
       */
      sendTicketEmail(email, "Ticket Confirmation", renderedTemplate, (err, result) => {
        // Handle email sending errors
        if (err) {
          console.error("Error sending email:", err);
          return res.status(500).send({ success: false, error: err.message });
        }
        
        // Return success response with email delivery result
        res.status(200).send({ success: true, result });
      });
    });
  });
};

/**
 * Handles password reset functionality including user lookup, password generation, and email notification
 * @param {Object} req - Express request object containing user credentials
 * @param {Object} req.body - Request body containing user identification
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.username - User's username
 * @param {Object} res - Express response object
 */
exports.resetPassword = (req, res) => {
  // Extract user identification from request body
  const { email, username } = req.body;

  /**
   * Find user record matching provided credentials
   * @callback findUserCallback
   * @param {Error|null} err - Database error if occurs
   * @param {Array} result - Matching user records
   */
  findUserByEmail(email, username, (err, result) => {
    // Handle database query errors
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).send("Server error occurred.");
    }

    // Check if user exists
    if (result.length === 0) {
      return res.status(404).send("Email not found.");
    }

    // Generate new random password
    const newPassword = passwordGenerator();

    /**
     * Hash the newly generated password for secure storage
     * @callback hashPasswordCallback
     * @param {Error|null} err - Password hashing error if occurs
     * @param {string} hashedPassword - Securely hashed password
     */
    hashPassword(newPassword, (err, hashedPassword) => {
      // Handle password hashing errors
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).send("Error hashing the password.");
      }

      /**
       * Update user's password in the database
       * @callback updateUserCallback
       * @param {Error|null} err - Database update error if occurs
       */
      updateUserPassword(result[0].userID, hashedPassword, (err) => {
        // Handle password update errors
        if (err) {
          console.error("Error updating the password in the database:", err);
          return res.status(500).send("Error updating the password.");
        }

        /**
         * Send password reset confirmation email to user
         * @callback sendResetEmailCallback
         * @param {Error|null} err - Email sending error if occurs
         */
        sendTicketEmail(email, "Password reset", `Your new password is: ${newPassword}`, (err) => {
          // Handle email sending errors
          if (err) {
            console.error("Error sending email:", err);
            return res.status(500).send("Failed to send the email.");
          }

          // Return success response with confirmation message
          res.status(200).send("Password reset successfully. Check your email for the new password.");
        });
      });
    });
  });
};
