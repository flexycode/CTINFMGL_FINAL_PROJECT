const mysql = require("mysql2/promise");
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function createConnection() {
  try {
    // Detailed connection configuration
    const connectionConfig = {
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "artificial_ledger_airlines_flight_booking",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      port: process.env.DB_PORT || 3306,
      
      // Add additional connection parameters
      connectTimeout: 10000, // 10 seconds
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };

    // Log connection details (without password)
    console.log('Attempting to connect with config:', {
      host: connectionConfig.host,
      database: connectionConfig.database,
      user: connectionConfig.user,
      port: connectionConfig.port
    });

    // Create the connection
    const connection = await mysql.createConnection(connectionConfig);
    
    console.log("Database Connected Successfully!");
    return connection;
  } catch (error) {
    // Detailed error logging
    console.error("Database Connection Error Details:");
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);
    console.error("Error Code:", error.code);
    
    // Provide specific troubleshooting advice
    if (error.code === 'ECONNREFUSED') {
      console.error("\n--- Troubleshooting Steps ---");
      console.error("1. Ensure MySQL server is running");
      console.error("2. Check MySQL service status");
      console.error("3. Verify connection details in .env file");
      console.error("4. Confirm MySQL is listening on the specified port");
      console.error("5. Check firewall settings");
    }

    // Re-throw the error to be handled by the caller
    throw error;
  }
}

// Function to check database existence and create if not exists
async function ensureDatabaseExists() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || ""
    });

    const dbName = process.env.DB_NAME || "artificial_ledger_airlines_flight_booking";

    // Check if database exists
    const [databases] = await connection.query(
      `SHOW DATABASES LIKE '${dbName}'`
    );

    if (databases.length === 0) {
      console.log(`Database ${dbName} does not exist. Creating...`);
      await connection.query(`CREATE DATABASE \`${dbName}\``);
      console.log(`Database ${dbName} created successfully.`);
    }

    await connection.end();
  } catch (error) {
    console.error("Error checking/creating database:", error);
    throw error;
  }
}

module.exports = {
  createConnection,
  ensureDatabaseExists
};