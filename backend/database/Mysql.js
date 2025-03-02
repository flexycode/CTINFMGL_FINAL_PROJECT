const mysql = require("mysql2");

<<<<<<< HEAD
=======
// Create a database connection using MySQL
>>>>>>> 6153a59 (Added comments to backend code for better readability)
var connection = mysql.createConnection({
  host: "localhost",
  database: "web",
  user: "root",
  password: "2004j",
});

try {
  connection.connect();
  console.log("Connected Successfully!!");
} catch (e) {
  console.log("Can't connect to database: ", e);
}

module.exports = connection;
