const express = require('express');
const chatgptController=require("../controller/chatbotController");
const router = express.Router();
const verifyToken = require("../auth/userAuth");

<<<<<<< HEAD
=======
// Route to get a response from the chatbot
>>>>>>> 6153a59 (Added comments to backend code for better readability)
router.post("/getResponse",verifyToken,chatgptController.chatgptController);

module.exports = router;
