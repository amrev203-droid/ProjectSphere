require("dotenv").config();
const PORT=process.env.PORT ||8000;
const express=require("express");
const authRoutes=require("./routes/authRoutes.js");
const app=express();
app.use(authRoutes);
app.get("/", (req, res) => {
    console.log("request received")
    res.send("Welcome to ProjectSphere 🚀");
});
app.listen(PORT,()=>{
    console.log("server is running on port",PORT);
    
});
