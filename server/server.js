import express from "express";
import mongoose from "mongoose";
import studentRouter from "./src/routes/student.js"
import dotenv from "dotenv"
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("DB connected");
});


const app = express();

app.use(express.json());

app.use("/students",studentRouter);



app.get("/",(req,res)=>{
    res.send("SERVER IS WORKING");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,(req,res)=>{
    console.log(`server is listening to port ${PORT}`);
})