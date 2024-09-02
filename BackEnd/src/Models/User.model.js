import mongoose from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt";
import jsonwebtoken from "jsonwebtoken";

const userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
        minLength:6,
        maxLength:30,
        trim:true,

    },
    last_name:{
        type:String,
        required:true,
        minLength:6,
        maxLength:30,
        trim:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true
    },
    picture:{
        type:String
    },
    password:{
        required:[true,"Password is Required","Minimum length 8"],
        type:String,
        minLength:8
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre



const User=mongoose.model("User",userSchema)