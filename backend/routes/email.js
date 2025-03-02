const express = require("express");
const router = express.Router();
const userController = require("../controller/emailController");
const verifyToken = require("../auth/userAuth");

<<<<<<< HEAD
router.post("/",verifyToken, userController.sendTicketConfirmation);
=======
// Route to send a ticket confirmation email
router.post("/",verifyToken, userController.sendTicketConfirmation);

// Route to reset the user's password
>>>>>>> 6153a59 (Added comments to backend code for better readability)
router.post("/forgotPass", userController.resetPassword);

module.exports = router;
