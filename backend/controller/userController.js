// Import user service module for user-related operations
const userService = require("../services/userService");

/**
 * Handles user registration with validation and error handling
 * @param {Object} req - Express request object containing user registration details
 * @param {Object} req.body - Request body containing user information
 * @param {string} req.body.username - Unique username chosen by user
 * @param {string} req.body.password - User's password (will be hashed)
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.phoneNumber - User's phone number
 * @param {Object} res - Express response object
 */
const register = (req, res) => {
  // Extract user registration details from request body
  const { username, password, email, phoneNumber } = req.body;

  /**
   * Attempt to register new user through user service
   * @callback registerUserCallback
   * @param {Error|null} err - Registration error if occurs
   * @param {string} message - Success message if registration is successful
   */
  userService.registerUser(username, password, email, phoneNumber, (err, message) => {
    // Handle registration errors with appropriate HTTP status codes
    if (err) {
      if (err.type === "conflict") {
        // Return 409 Conflict if username/email already exists
        return res.status(409).send(err.message);
      }
      // Return 500 Server Error for other registration errors
      return res.status(500).send(err.message);
    }
    // Return 201 Created with success message for successful registration
    res.status(201).send(message);
  });
};

/**
 * Handles user authentication with error handling
 * @param {Object} req - Express request object containing login credentials
 * @param {Object} req.body - Request body containing login information
 * @param {string} req.body.username - User's username
 * @param {string} req.body.password - User's password
 * @param {Object} res - Express response object
 */
const login = (req, res) => {
  // Extract login credentials from request body
  const { username, password } = req.body;

  /**
   * Attempt to authenticate user through user service
   * @callback loginUserCallback
   * @param {Error|null} err - Authentication error if occurs
   * @param {Object} data - Authentication response data
   */
  userService.loginUser(username, password, (err, data) => {
    // Handle authentication errors with appropriate HTTP status codes
    if (err) {
      if (err.type === "unauthorized") {
        // Return 401 Unauthorized for invalid credentials
        return res.status(401).send(err.message);
      }
      // Return 500 Server Error for other authentication errors
      return res.status(500).send(err.message);
    }
    // Return 200 OK with authentication data for successful login
    res.status(200).send(data);
  });
};

/**
 * Handles retrieval of user profile information
 * @param {Object} req - Express request object containing authorization token
 * @param {string} req.header.authorization - JWT token for authentication
 * @param {Object} res - Express response object
 */
const getProfile = (req, res) => {
  // Extract JWT token from authorization header
  const token = req.header("authorization");

  /**
   * Attempt to retrieve user profile using provided token
   * @callback getUserProfileCallback
   * @param {Error|null} err - Profile retrieval error if occurs
   * @param {Object} profile - User profile information
   */
  userService.getUserProfile(token, (err, profile) => {
    // Handle profile retrieval errors with appropriate HTTP status codes
    if (err) {
      if (err.type === "not_found") {
        // Return 404 Not Found if user not found
        return res.status(404).send(err.message);
      }
      // Return 500 Server Error for other profile retrieval errors
      return res.status(500).send(err.message);
    }
    // Return 200 OK with profile data for successful retrieval
    res.send(profile);
  });
};

/**
 * Handles updating of user profile information
 * @param {Object} req - Express request object containing token and update data
 * @param {string} req.header.authorization - JWT token for authentication
 * @param {Object} req.body - Request body containing profile updates
 * @param {string} req.body.phoneNumber - Updated phone number
 * @param {string} req.body.username - Updated username
 * @param {Object} res - Express response object
 */
const updateProfile = (req, res) => {
  // Extract JWT token from authorization header
  const token = req.header("authorization");
  // Extract profile update information from request body
  const { phoneNumber, username } = req.body;

  /**
   * Attempt to update user profile using provided token and data
   * @callback updateUserProfileCallback
   * @param {Error|null} err - Profile update error if occurs
   * @param {string} message - Success message if update is successful
   */
  userService.updateUserProfile(token, username, phoneNumber, (err, message) => {
    // Handle profile update errors with appropriate HTTP status codes
    if (err) {
      if (err.type === "conflict") {
        // Return 403 Forbidden for username conflicts
        return res.status(403).send(err.message);
      }
      // Return 500 Server Error for other profile update errors
      return res.status(500).send(err.message);
    }
    // Return 200 OK with success message for successful update
    res.status(200).send(message);
  });
};

// Export all user-related route handlers
module.exports = { register, login, getProfile, updateProfile };
