const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../database/Mysql");

/**
 * Handles user registration with validation and password hashing
 * @param {string} username - Unique username chosen by the user
 * @param {string} password - Raw password to be hashed
 * @param {string} email - User's email address
 * @param {string} phoneNumber - User's phone number
 * @param {Function} callback - Callback function to handle response/error
 * @returns {void} Executes callback with either error object or success message
 * @example
 * registerUser("johnDoe", "password123", "john@example.com", "+1234567890", (err, result) => {
 *   if (err) console.error(err);
 *   console.log(result); // "User registered successfully"
 * });
 */
const registerUser = (username, password, email, phoneNumber, callback) => {
  // Check if username already exists
  connection.query(
    "SELECT username FROM user WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) return callback({ type: "database", message: err.message });
      if (result.length > 0) return callback({ type: "conflict", message: "User already exists" });

      // Check if email already exists
      connection.query(
        "SELECT email FROM user WHERE email = ?",
        [email],
        async (err, result) => {
          if (err) return callback({ type: "database", message: err.message });
          if (result.length > 0) return callback({ type: "conflict", message: "Email already exists" });

          // Hash the password for secure storage
          const hashedPassword = await bcrypt.hash(password, 10);
          
          // Insert new user with default 'user' role
          const sql =
            "INSERT INTO user (username, password, role, email, phoneNumber) VALUES (?, ?, 'user', ?, ?)";

          connection.query(sql, [username, hashedPassword, email, phoneNumber], (err) => {
            if (err) return callback({ type: "database", message: "Error registering user" });
            callback(null, "User registered successfully");
          });
        }
      );
    }
  );
};

/**
 * Handles user login with password verification and JWT token generation
 * @param {string} username - User's username
 * @param {string} password - Raw password to verify
 * @param {Function} callback - Callback function to handle response/error
 * @returns {void} Executes callback with either error object or token/role object
 * @example
 * loginUser("johnDoe", "password123", (err, result) => {
 *   if (err) console.error(err);
 *   console.log(result); // { token: "jwt-token", role: "user" }
 * });
 */
const loginUser = (username, password, callback) => {
  // Find user by username
  connection.query(
    "SELECT userID, username, password, role, email FROM user WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) return callback({ type: "database", message: err.message });
      if (result.length === 0) return callback({ type: "unauthorized", message: "Invalid credentials" });

      const user = result[0];
      
      // Verify password using bcrypt
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) return callback({ type: "unauthorized", message: "Invalid credentials" });

      // Generate JWT token with user details and 30-minute expiration
      const token = jwt.sign(
        {
          userID: user.userID,
          username: user.username,
          role: user.role,
          email: user.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "30m" }
      );
      
      callback(null, { token, role: user.role });
    }
  );
};

/**
 * Retrieves user profile information using a valid JWT token
 * @param {string} token - JWT token for authentication
 * @param {Function} callback - Callback function to handle response/error
 * @returns {void} Executes callback with either error object or user profile data
 * @example
 * getUserProfile("jwt-token", (err, result) => {
 *   if (err) console.error(err);
 *   console.log(result); // Array of user profile data
 * });
 */
const getUserProfile = (token, callback) => {
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    // Retrieve user profile using decoded userID
    const sql = "SELECT * FROM user WHERE userID = ?";
    connection.query(sql, [decoded.userID], (err, result) => {
      if (err || result.length === 0) return callback({ type: "not_found", message: "User not found" });
      callback(null, result);
    });
  } catch (err) {
    callback({ type: "auth", message: "Invalid token" });
  }
};

/**
 * Updates user profile information using a valid JWT token
 * @param {string} token - JWT token for authentication
 * @param {string} username - New username
 * @param {string} phoneNumber - New phone number
 * @param {Function} callback - Callback function to handle response/error
 * @returns {void} Executes callback with either error object or success message
 * @example
 * updateUserProfile("jwt-token", "newUsername", "+1234567890", (err, result) => {
 *   if (err) console.error(err);
 *   console.log(result); // "Profile updated successfully"
 * });
 */
const updateUserProfile = (token, username, phoneNumber, callback) => {
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if new username is already taken
    connection.query("SELECT * FROM user WHERE username = ?", [username], (err, result) => {
      if (err) return callback({ type: "database", message: err.message });
      if (result.length > 0) return callback({ type: "conflict", message: "Username already exists" });

      // Update user profile
      const sql = "UPDATE user SET username = ?, phoneNumber = ? WHERE userID = ?";
      connection.query(sql, [username, phoneNumber, decoded.userID], (err) => {
        if (err) return callback({ type: "database", message: "Error updating profile" });
        callback(null, "Profile updated successfully");
      });
    });
  } catch (err) {
    callback({ type: "auth", message: "Invalid token" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
