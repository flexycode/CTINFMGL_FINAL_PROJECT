const express = require("express");
const { register, login, getProfile, updateProfile} = require("../controller/userController");
const verifyToken=require("../auth/userAuth");
const router = express.Router();

<<<<<<< HEAD


router.post("/register", register);
router.post("/login", login);
router.get("/getProfile",verifyToken,getProfile);
=======
// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);

// Route to get the authenticated user's profile
router.get("/getProfile",verifyToken,getProfile);

// Route to update the authenticated user's profile
>>>>>>> 6153a59 (Added comments to backend code for better readability)
router.put("/updateProfile",verifyToken,updateProfile);


module.exports = router;