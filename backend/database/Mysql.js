// Import mysql2 driver for database connectivity
const mysql = require("mysql2");

// Create database connection configuration object
var connection = mysql.createConnection({
  // Database server hostname or IP address
  host: "localhost",
  // Name of the database to connect to
  database: "web",
  // Database username for authentication
  user: "root",
  // Password for database authentication
  password: "2004j",
});

// Attempt to establish database connection
try {
  // Initialize connection to the database
  connection.connect();
  // Log successful connection message
  console.log("Connected Successfully!!");
} catch (e) {
  // Log error message if connection fails
  console.log("Can't connect to database: ", e);
}

// Export the database connection for use in other modules
module.exports = connection;
