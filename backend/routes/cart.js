const express = require("express");
const verifyToken = require("../auth/userAuth");
const router = express.Router();
const {addToCart,getCart,deleteFromCart} =require("../controller/cartController");

router.post("/", verifyToken, addToCart);

router.get("/getall",verifyToken, getCart );

router.delete("/delete",verifyToken,deleteFromCart);

module.exports = router;
