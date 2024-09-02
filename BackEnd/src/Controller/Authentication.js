import mongoose from "mongoose";
export const Sign_up=async(req,res)=>{
    const{basicInfo,address,communicationPreference,companyInfo,addInfo}=req.body
    res.status(200).json({
        message:"OK"
    })
}