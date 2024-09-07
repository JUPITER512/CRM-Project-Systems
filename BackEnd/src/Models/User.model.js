import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from 'bcrypt'
// import bcrypt from 'bcryptjs'
const userSchema=new mongoose.Schema({
    name:{
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
    pictureId:{
        type:String
    },
    password:{
        required:[true,"Password is Required","Minimum length 8"],
        type:String,
        minLength:8
    },
    address:{
        type:String,
        trim:true,
    },
    companyname:{
        type:String,
        trim:true,
    },
    otp:{
        type:Number
    },
    verify:{
        type:Boolean
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})
userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,5);
        next()
    }
    next()
})
userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
    return jsonwebtoken.sign({
        _id:this._id,
        email:this.email,
        name:this.name
    },
    process.env.ACCESS_KEY_SECRET,{
        expiresIn:process.env.ACCESS_EXPIRIY
    }
)
}
userSchema.methods.generateRefershToken=function(){
    return jsonwebtoken.sign({
        _id:this._id
    },
    process.env.REFRESH_KEY_SECRET,{
        expiresIn:process.env.REFRESH_EXPIRIY
    }
)
}
userSchema.methods.toJsonobj=function(){
    const user=this;
    const userObject=user.toObject();
    delete userObject.password
    delete userObject.refreshToken;
    delete userObject.__v;
    return userObject;
}

export const User=mongoose.model("User",userSchema)
