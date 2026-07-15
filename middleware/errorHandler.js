const errorHandler=(error,req,res,next)=>{
    console.error(error);
    res.status(500).send("internal server error");
};
module.exports=errorHandler;