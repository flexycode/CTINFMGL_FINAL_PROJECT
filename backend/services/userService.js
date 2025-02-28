const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../database/Mysql");

const registerUser = (username, password, email, phoneNumber, callback) => {
  connection.query(
    "SELECT username FROM user WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) return callback({ type: "database", message: err.message });
      if (result.length > 0) return callback({ type: "conflict", message: "User already exists" });

      connection.query(
        "SELECT email FROM user WHERE email = ?",
        [email],
        async (err, result) => {
          if (err) return callback({ type: "database", message: err.message });
          if (result.length > 0) return callback({ type: "conflict", message: "Email already exists" });

          const hashedPassword = await bcrypt.hash(password, 10);
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


const loginUser = (username, password, callback) => {
  connection.query(
    "SELECT userID, username, password, role, email FROM user WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) return callback({ type: "database", message: err.message });
      if (result.length === 0) return callback({ type: "unauthorized", message: "Invalid credentials" });

      const user = result[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) return callback({ type: "unauthorized", message: "Invalid credentials" });

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

const getUserProfile = (token, callback) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sql = "SELECT * FROM user WHERE userID = ?";
    connection.query(sql, [decoded.userID], (err, result) => {
      if (err || result.length === 0) return callback({ type: "not_found", message: "User not found" });
      callback(null, result);
    });
  } catch (err) {
    callback({ type: "auth", message: "Invalid token" });
  }
};

const updateUserProfile = (token, username, phoneNumber, callback) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    connection.query("SELECT * FROM user WHERE username = ?", [username], (err, result) => {
      if (err) return callback({ type: "database", message: err.message });
      if (result.length > 0) return callback({ type: "conflict", message: "Username already exists" });

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
