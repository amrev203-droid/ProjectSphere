const express=require("express")
const  {createProject}=require("../controllers/projectControllers");
const authMiddleware=require("../middleware/authMiddleware.js");
const validateProject=require("../middleware/validateProject.js");
const {getProjects,getProject,updateProject,deleteProject}=require("../controllers/projectControllers.js");

const router=express.Router();
router.post("/projects",authMiddleware,validateProject,createProject);
router.get("/projects",getProjects)
router.get("/projects/:id",getProject)
router.patch("/projects/:id", authMiddleware, updateProject);
router.delete("/projects/:id", authMiddleware, deleteProject);
module.exports=router;
