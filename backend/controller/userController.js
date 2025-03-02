const userService = require("../services/userService");

<<<<<<< HEAD
=======
/**
 * Handles user registration.
 * - Extracts user details from request body.
 * - Calls the user service to register the user.
 * - Returns appropriate responses for success or error scenarios.
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
const register = (req, res) => {
  const { username, password, email, phoneNumber } = req.body;

  userService.registerUser(username, password, email, phoneNumber, (err, message) => {
    if (err) {
      if (err.type === "conflict") return res.status(409).send(err.message);
      return res.status(500).send(err.message);
    }
    res.status(201).send(message);
  });
};

<<<<<<< HEAD
=======
/**
 * Handles user login.
 * - Extracts login credentials from request body.
 * - Calls the user service to authenticate the user.
 * - Returns appropriate responses for success or failure.
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
const login = (req, res) => {
  const { username, password } = req.body;

  userService.loginUser(username, password, (err, data) => {
    if (err) {
      if (err.type === "unauthorized") return res.status(401).send(err.message);
      return res.status(500).send(err.message);
    }
    res.status(200).send(data);
  });
};

<<<<<<< HEAD
=======
/**
 * Retrieves user profile information.
 * - Extracts authorization token from request headers.
 * - Calls the user service to fetch the user profile.
 * - Returns profile data or handles errors.
 */
>>>>>>> 6153a59 (Added comments to backend code for better readability)
const getProfile = (req, res) => {
  const token = req.header("authorization");

  userService.getUserProfile(token, (err, profile) => {
    if (err) {
      if (err.type === "not_found") return res.status(404).send(err.message);
      return res.status(500).send(err.message);
    }
    res.send(profile);
  });
};

<<<<<<< HEAD
=======
/**
 * Updates user profile information.
 * - Extracts authorization token and new user details from request.
 * - Calls the user service to update profile data.
 * - Returns appropriate responses based on update success or failure.
 */

>>>>>>> 6153a59 (Added comments to backend code for better readability)
const updateProfile = (req, res) => {
  const token = req.header("authorization");
  const { phoneNumber, username } = req.body;

  userService.updateUserProfile(token, username, phoneNumber, (err, message) => {
    if (err) {
      if (err.type === "conflict") return res.status(403).send(err.message);
      return res.status(500).send(err.message);
    }
    res.status(200).send(message);
  });
};

module.exports = { register, login, getProfile, updateProfile };
