const validateSignup=(req,res,next)=>{
    const{username,name,email,password}=req.body;

    //check mail
    if(!username||!name || !email || !password){
        return res.status(400).send("please enter the username,name, email and password");
    }else 
        next();
    
};
module.exports=validateSignup;