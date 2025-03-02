const  express = require('express');
const router = express.Router();
const verifyAdmin = require('../auth/adminAuth');
const { getFlights, addFlight } = require('../controller/flightController');

<<<<<<< HEAD
router.post("/", getFlights);
=======
// Route to get available flights
router.post("/", getFlights);

// Route to add a new flight
>>>>>>> 6153a59 (Added comments to backend code for better readability)
router.post("/addFlight",verifyAdmin, addFlight);

module.exports=router;