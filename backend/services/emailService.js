const bcrypt = require("bcrypt");
const path = require("path");
const ejs = require("ejs");
const connection = require("../database/Mysql");
const sendEmail = require("../config/emailConfig").sendEmail;

<<<<<<< HEAD
=======
/**
 * Generates a random password consisting of 5 letters and 3 numbers.
 * The final password is shuffled to mix characters.
 * @returns {string} A randomly generated password.
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
function passwordGenerator() {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 3; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return result.split("").sort(() => 0.5 - Math.random()).join("");
}

<<<<<<< HEAD
=======
/**
 * Renders an EJS ticket template with given data.
 * @param {Object} data - Data to be passed to the template.
 * @param {function} callback - Callback function (error, renderedTemplate).
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
function renderTicketTemplate(data, callback) {
  const filePath = path.join(__dirname, "../views/index.ejs");
  ejs.renderFile(filePath, data, callback);
}

<<<<<<< HEAD
=======
/**
 * Sends a ticket confirmation email.
 * @param {string} email - Recipient's email address.
 * @param {string} subject - Email subject.
 * @param {string} content - Email body (rendered template).
 * @param {function} callback - Callback function (error, success).
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
function sendTicketEmail(email, subject, content, callback) {
  sendEmail(email, subject, content, callback);
}

<<<<<<< HEAD
=======
/**
 * Searches for a user in the database by email and username.
 * @param {string} email - User's email.
 * @param {string} username - User's username.
 * @param {function} callback - Callback function (error, results).
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
function findUserByEmail(email,username, callback) {
  connection.query("SELECT userID FROM user WHERE email = ? and username=? ", [email,username], callback);
}

<<<<<<< HEAD
=======
/**
 * Updates a user's password in the database.
 * @param {number} userID - The user's unique ID.
 * @param {string} hashedPassword - The new hashed password.
 * @param {function} callback - Callback function (error, result).
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
function updateUserPassword(userID, hashedPassword, callback) {
  connection.query("UPDATE user SET password = ? WHERE userID = ?", [hashedPassword, userID], callback);
}

<<<<<<< HEAD
=======
/**
 * Hashes a password using bcrypt with a salt round of 10.
 * @param {string} password - The plain-text password.
 * @param {function} callback - Callback function (error, hashedPassword).
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
function hashPassword(password, callback) {
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, callback);
}

module.exports = {
  passwordGenerator,
  renderTicketTemplate,
  sendTicketEmail,
  findUserByEmail,
  updateUserPassword,
  hashPassword,
};
