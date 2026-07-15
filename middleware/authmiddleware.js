const jwt=require("jsonwebtoken")
const authMiddleware=(req,res ,next)=>{
    const authHeader= req.headers.authorization;
    if(!authHeader){
        return res.status(401).send("Authentication Required");
    }
    const token=authHeader.split(" ")[1];
    try{
        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.userId=decoded.userId;
       
        next();
    }
    catch(error){
      return res.status(401).send("Invalid or expired token")
    };
}
module.exports=authMiddleware;