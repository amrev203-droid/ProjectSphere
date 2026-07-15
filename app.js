require("dotenv").config();
const PORT=process.env.PORT ||8000;
const express=require("express");
const authRoutes=require("./routes/authRoutes.js");
const projectRoutes=require("./routes/projectRoutes.js")
const loggerMiddleware=require("./middleware/loggermiddleware.js");
const errorHandler=require("./middleware/errorHandler.js")

const app=express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(authRoutes);
app.use(projectRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
    console.log("request received")
    res.send("Welcome to ProjectSphere 🚀");
});

app.listen(PORT,()=>{
    console.log("server is running on port",PORT);
    
});
