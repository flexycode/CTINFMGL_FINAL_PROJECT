const  express = require('express');
const router = express.Router();
const verifyAdmin = require('../auth/adminAuth');
const { getFlights, addFlight } = require('../controller/flightController');

router.post("/", getFlights);
router.post("/addFlight",verifyAdmin, addFlight);

module.exports=router;