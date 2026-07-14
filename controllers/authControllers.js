const login=(req,res)=>{
    res.send("Login Controller");
};
const profile=(req,res)=>{
    res.send("Welcome to profile")
}
const bcrypt=require("bcrypt");
const prisma=require("../config/prisma");

const signup=async(req,res)=>{ const{username,name ,email,password}=req.body;

   const existingUser=await prisma.user.findFirst({
        where:{
            OR:[
                    {username},
                    {email}
                ]
        }
     });

    if(existingUser){
        return res.status(409).send("username already exist");
    }
     const passwordHash=await bcrypt.hash(password,7);
    
    const user=await prisma.user.create({
        data:{
            username,
            name,
            email,
            passwordHash,
        },
    });

    console.log(user);
    res
    .status(201)
    .send("signup successfully");
    
};
module.exports={
    login,
    profile,
    signup,
};
