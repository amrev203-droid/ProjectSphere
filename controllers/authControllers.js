const login=(req,res)=>{
    res.send("Login Controller");
};
const profile=(req,res)=>{
    res.send("Welcome to profile")
}

module.exports={
    login,
    profile
};
