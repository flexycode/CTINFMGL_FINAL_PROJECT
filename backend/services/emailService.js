// Import required dependencies for password management and email functionality
const bcrypt = require("bcrypt");
const path = require("path");
const ejs = require("ejs");
const connection = require("../database/Mysql");
const sendEmail = require("../config/emailConfig").sendEmail;

/**
 * Generates a random password combining letters and numbers
 * @returns {string} A shuffled combination of 5 random letters and 3 random numbers
 */
function passwordGenerator() {
  // Define character sets for password generation
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let result = "";
  
  // Add 5 random letters to the password
  for (let i = 0; i < 5; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  // Add 3 random numbers to the password
  for (let i = 0; i < 3; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  // Shuffle the password characters for better randomness
  return result.split("").sort(() => 0.5 - Math.random()).join("");
}

/**
 * Renders an EJS template with provided data
 * @param {object} data - Data to pass to the template
 * @param {function} callback - Callback function(err, renderedHTML)
 */
function renderTicketTemplate(data, callback) {
  // Construct the full path to the template file
  const filePath = path.join(__dirname, "../views/index.ejs");
  // Render the template with the provided data
  ejs.renderFile(filePath, data, callback);
}

/**
 * Sends an email using the configured email service
 * @param {string} email - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} content - Email content
 * @param {function} callback - Callback function(err)
 */
function sendTicketEmail(email, subject, content, callback) {
  // Forward email parameters to the email configuration service
  sendEmail(email, subject, content, callback);
}

/**
 * Finds a user by email and username combination
 * @param {string} email - User's email address
 * @param {string} username - User's username
 * @param {function} callback - Callback function(err, results)
 */
function findUserByEmail(email, username, callback) {
  // Query database for user matching both email and username
  connection.query("SELECT userID FROM user WHERE email = ? and username=? ", [email, username], callback);
}

/**
 * Updates a user's password in the database
 * @param {number} userID - ID of the user to update
 * @param {string} hashedPassword - The new hashed password
 * @param {function} callback - Callback function(err, results)
 */
function updateUserPassword(userID, hashedPassword, callback) {
  // Update password in database for the specified user
  connection.query("UPDATE user SET password = ? WHERE userID = ?", [hashedPassword, userID], callback);
}

/**
 * Hashes a password using bcrypt
 * @param {string} password - Password to hash
 * @param {function} callback - Callback function(err, hash)
 */
function hashPassword(password, callback) {
  // Set bcrypt salt rounds for password hashing
  const saltRounds = 10;
  // Generate hashed password
  bcrypt.hash(password, saltRounds, callback);
}

// Export all utility functions for external use
module.exports = {
  passwordGenerator,
  renderTicketTemplate,
  sendTicketEmail,
  findUserByEmail,
  updateUserPassword,
  hashPassword,
};
