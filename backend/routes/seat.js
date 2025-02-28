const express = require("express");
const router = express.Router();
const {getSeats,addSeat} = require("../controller/seatController");
const verifyToken = require("../auth/userAuth");

router.post("/",verifyToken,getSeats);
router.put("/addSeat",verifyToken,addSeat);

// router.put("/addSeat", (req, res) => {
//   const { seatID } = req.body;

//   const sql = "UPDATE seats SET Status = 'Booked' WHERE SeatID = ?";

//   connection.query(sql, [seatID], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Error updating seat status.");
//     }

//     if (results.affectedRows === 0) {
//       return res.status(404).send("Seat not found or already booked.");
//     }

//     res.send("Seat status updated to 'Booked' successfully.");
//   });
// });




module.exports = router;
