const express=require("express")
const  createProject=require("../controllers/projectControllers");
const authMiddleware=require("../middleware/authMiddleware.js");
const validateProject=require("../middleware/validateProject.js");
const router=express.Router();
router.post("/projects",authMiddleware,validateProject,createProject);
module.exports=router;
