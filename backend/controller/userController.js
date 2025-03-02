const userService = require("../services/userService");

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
