const authMiddleware=(req,res ,next)=>{
    console.log("AuthMiddleware Executed");
    next();
};
module.exports=authMiddleware;