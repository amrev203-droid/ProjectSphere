const express = require("express");
const router=express.Router();

const {login, profile}=require("../controllers/authControllers.js");
router.get("/login",login);
router.get("/login/profile",profile);
module.exports =router;
    
