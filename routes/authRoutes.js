const express = require("express");
const validateSignup=require("../middleware/validateSignup.js");
const {login, profile, signup}=require("../controllers/authControllers.js");

const router=express.Router();

router.get("/login",login);
router.get("/profile",profile);
router.post("/signup",validateSignup,signup);

module.exports =router;
    
