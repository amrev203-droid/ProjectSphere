
const jwt= require("jsonwebtoken");

const login=async(req,res,next)=>{
    try{
      
      const{email,password}=req.body;
      const existingUser=await prisma.user.findUnique({
        where:{
            email,
        },
      });
      if(existingUser){
         const isPasswordCorrect= await bcrypt.compare(password,existingUser.passwordHash);
         if(isPasswordCorrect){
            const token=jwt.sign(
                {
                    userId: existingUser.id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"7d",
 
                },
            )
            return res.status(200).json({
                message:"Login succesfully",
                token,
            });
        };}
        return res.status(401).send("wrong email or password");
        
      }
      catch(error){
        next(error);
      }
     };
const profile=async(req,res,next)=>{
   const user = await prisma.user.findUnique({
            where: {
                id: req.userId,
            },
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

    console.log(req.userId);
    res.json({
        id:user.id,
        username:user.username,
        name:user.name,
        email:user.email,
    })
}
const bcrypt=require("bcrypt");
const prisma=require("../config/prisma");

const signup=async(req,res,next)=>{ 
    try{
        const{username,name ,email,password}=req.body;
        const existingUser=await prisma.user.findFirst({
            where:{
                OR:[
                    {username},
                    {email}
                   ]
                  }
         });
    if(existingUser){
        return res.status(409).send("username or email already exist");
    }
    const passwordHash=await bcrypt.hash(password,12);
    const user=await prisma.user.create(
        {
        data:{
            username,
            name,
            email,
            passwordHash,
             },
    });

    console.log(user);
    res.status(201).json({
        message:"signup successfully",
        user:{
            id:user.id,
            username,
            name,
            email
           }
    });
}

    catch(error){
        next(error);
    }
    
};
module.exports={
    login,
    profile,
    signup,
};
