const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyAdmin = (req, res, next)=>{
    const token = req.header('authorization'); 

    if(!token){
        return res.status(403).send("Access denied. No token provided.");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        if(decoded.role==="admin"){
        next(); 
        }
        else {
            return res.status(403).send("Access denied. Admin privileges required.");
        }
    } catch (error) {
        res.status(401).send("Invalid token.");
    }

}

module.exports=verifyAdmin;