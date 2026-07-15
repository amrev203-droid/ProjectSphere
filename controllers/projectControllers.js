const prisma=require("../config/prisma");
const createProject=async(req,res,next)=>{
    try{
        const{title,description}=req.body;
        const project=await prisma.project.create({
            data:{
                title,
                description,
                ownerId:req.userId,
            }

        })
        return res.status(201).json(
            {
                message:"project created succesfully",
                project,
            }
        );}
    catch(error){
    next(error);
}}
module.exports=createProject;
