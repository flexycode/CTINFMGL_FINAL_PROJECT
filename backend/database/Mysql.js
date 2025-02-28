const mysql = require("mysql2");

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
