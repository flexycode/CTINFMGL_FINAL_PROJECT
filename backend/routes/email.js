const express = require("express");
const router = express.Router();
const userController = require("../controller/emailController");
const verifyToken = require("../auth/userAuth");

router.post("/",verifyToken, userController.sendTicketConfirmation);
router.post("/forgotPass", userController.resetPassword);

module.exports = router;
