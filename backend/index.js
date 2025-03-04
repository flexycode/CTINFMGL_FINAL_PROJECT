const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const { createConnection, ensureDatabaseExists } = require('./database/Mysql');

// Load environment variables
dotenv.config();

// Import routes
const user = require('./routes/user');
const flights = require("./routes/flights");
const seat = require("./routes/seat");
const cart = require("./routes/cart");
const email = require("./routes/email");
const openAi = require('./routes/chatbot');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", user);
app.use("/flight", flights);
app.use("/seat", seat);
app.use("/cart", cart);
app.use("/email", email);
app.use("/openAi", openAi);

// Database Connection and Server Start
async function startServer() {
  try {
    // Ensure database exists before connecting
    await ensureDatabaseExists();
    
    // Create database connection
    await createConnection();
    
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit the process if server cannot start
  }
}

startServer();