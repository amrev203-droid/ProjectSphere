const validateProject=(req,res,next)=>{
    const{title, description}=req.body;
    if(!title || !description){
        return res.status(400).send("Please enter project title and description")
    }
    
        next();
    
}
module.exports=validateProject;