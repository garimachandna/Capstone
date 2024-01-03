import express from 'express'
import path from 'path'
import mongoose from 'mongoose';

mongoose
.connect("mongodb://127.0.0.1:27017",{
    dbName:"test_login",
})
.then(()=>console.log("Connected to DB"))
.catch((err)=>console.log(err));

const msgSchema = new mongoose.Schema({
    name: String,
    password: String,
});

const Messge = mongoose.model("Dets",msgSchema);

const app = express();
app.set("view engine","ejs");

app.get("/add",async(req,res)=>{
    await Messge.create({name:"Simran",password:"sample"});
    res.send("Created");
    });

app.get("/",(req,res)=>{

    res.render("login");
    //res.sendFile("index.html");
})



app.listen(5000,()=>{
    console.log("Server is working");
})