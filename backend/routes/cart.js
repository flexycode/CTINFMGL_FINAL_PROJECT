const express = require("express");
const verifyToken = require("../auth/userAuth");
const router = express.Router();
const {addToCart,getCart,deleteFromCart} =require("../controller/cartController");

<<<<<<< HEAD
router.post("/", verifyToken, addToCart);

router.get("/getall",verifyToken, getCart );

=======
// Route to add an item to the cart
router.post("/", verifyToken, addToCart);

// Route to retrieve all items in the user's cart
router.get("/getall",verifyToken, getCart );

// Route to delete an item from the cart
>>>>>>> 6153a59 (Added comments to backend code for better readability)
router.delete("/delete",verifyToken,deleteFromCart);

module.exports = router;
