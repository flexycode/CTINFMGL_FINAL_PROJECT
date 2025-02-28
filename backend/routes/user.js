const express = require("express");
const { register, login, getProfile, updateProfile} = require("../controller/userController");
const verifyToken=require("../auth/userAuth");
const router = express.Router();



router.post("/register", register);
router.post("/login", login);
router.get("/getProfile",verifyToken,getProfile);
router.put("/updateProfile",verifyToken,updateProfile);


module.exports = router;