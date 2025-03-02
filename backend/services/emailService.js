const bcrypt = require("bcrypt");
const path = require("path");
const ejs = require("ejs");
const connection = require("../database/Mysql");
const sendEmail = require("../config/emailConfig").sendEmail;

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

function renderTicketTemplate(data, callback) {
  const filePath = path.join(__dirname, "../views/index.ejs");
  ejs.renderFile(filePath, data, callback);
}

function sendTicketEmail(email, subject, content, callback) {
  sendEmail(email, subject, content, callback);
}

function findUserByEmail(email,username, callback) {
  connection.query("SELECT userID FROM user WHERE email = ? and username=? ", [email,username], callback);
}

function updateUserPassword(userID, hashedPassword, callback) {
  connection.query("UPDATE user SET password = ? WHERE userID = ?", [hashedPassword, userID], callback);
}

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
