const express = require("express");
const mongoose= require("mongoose");
const jwt = require ("jsonwebtoken");
const bcrypt =require("bcrypt");
const cors = require ("cors");
const { body, validationResult } = require('express-validator');
const user = require("./models/user");
const todo = require("./models/todo");
const { findOne } = require("./models/user");


const secrete= "pankaj@98@27@3"

const app = express();
mongoose.connect("mongodb://0.0.0.0/todolist" , (e)=>{
    (e)? console.log(e.message):console.log("mongoose is connected")
})

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());




app.get("/",(req,res)=>{

    res.status(200).json({
        res:"This Works"
    })
})

app.post("/" ,body("email").isEmail(),async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "provide valide email" });
    }
 try{

    const email = req.body.email;
    const password = req.body.password;



    const userData = await user.findOne({email:email})
   

    if(userData != null){
        const input = await bcrypt.compare(password , userData.password);

        if(input){
            const token = jwt.sign({
                exp: Math.floor(Date.now()/100)+(60*60) ,
                data:userData._id
            },secrete)

            res.status(200).json({
                token : token,
                userName: email
                })
        }else {
            res.status(400).json({
                message : "wrong password"
                })
        }
    }else {
        res.status(400).json({
            message : "email dont match"
            })
    }
 }catch(e){

    res.status(400).json({
       res:e.message
    })
 }
})


app.post("/register" ,body("email").isEmail(),async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "provide valide email" });
    }
 try{

    let pass =req.body.password
    pass = await bcrypt.hash(pass , 10)
    req.body.password=pass
    const data = user.create(req.body)
    res.status(200).json({
        message:"registration complited"
    })

 }catch(e){

    res.status(400).json({
       res:" user is  already there"
    })
 }
})

app.post("/add",async(req,res)=>{
  
 try{
   
    const token = req.headers.authorization
    const decoded = jwt.verify(token,secrete)
    
    const userData = await user.findOne({_id : decoded.data})
    console.log("hit3")
    req.user = userData._id

    if(userData!==null){

        req.body.user = decoded.data
       
        const data = await todo.create(req.body)

        res.status(200).json({
            message:"added to the list"
        })
    
    }


    

 }catch(e){

    res.status(400).json({
       res:" user is  already there"
    })
 }
})



app.listen(8080 , (e)=>{
    (e)? console.log(e.message):console.log("server is up at 8080")
})