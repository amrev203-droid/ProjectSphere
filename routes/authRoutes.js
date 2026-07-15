const express = require("express");
const validateSignup=require("../middleware/validateSignup.js");
const authMiddleware=require("../middleware/authMiddleware.js");

const {login, profile, signup}=require("../controllers/authControllers.js");

const router=express.Router();

router.post("/login",login);
router.get("/profile",authMiddleware,profile);
router.post("/signup",validateSignup,signup);

module.exports =router;
    
