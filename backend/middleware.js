// Middleware to verify token
const jwt = require("jsonwebtoken")
const express = require("express");
const router = express.Router();
 
module.exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.uid;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid Token" });
        if (err){
            res.clearCookie("uid")
            return res.status(403).json({message: "Invalid Token"});
        }
        req.user = user;
        next();
    });
};


 