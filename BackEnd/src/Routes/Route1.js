import express from "express";
const route1=express.Router();
route1.get('/',(req,res)=>{
    res.send("Hello World")
})
export default route1