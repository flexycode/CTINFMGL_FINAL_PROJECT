const express = require('express');
const chatgptController=require("../controller/chatbotController");
const router = express.Router();
const verifyToken = require("../auth/userAuth");

router.post("/getResponse",verifyToken,chatgptController.chatgptController);

module.exports = router;
