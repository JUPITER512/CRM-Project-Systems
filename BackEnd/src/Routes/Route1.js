import express from "express";
import { Change_Password, Change_Password_FromProfile, EmailVerification, Forget_Password, handleImage, handleimagebase64, Logout, Refresh_Token, Sign_in, Sign_up, Update_Info, User_Customer_Information, User_Information, Verify_Otp, verifyAccount } from "../Controller/Authentication.js";
import {verifyJsonWebToken} from '../Middlewear/verifyJwt.js'
import { Add_Customer, Get_Customer, Get_Single_Customer, Remove_customer, Update_customer_info } from "../Controller/Customer.js";
import {upload} from '../Middlewear/Multer.js'

const MainRoute=express.Router();


MainRoute.post('/sign-up',Sign_up);
MainRoute.post('/sign-in',Sign_in);
MainRoute.post('/verify-otp',Verify_Otp)
MainRoute.get('/verify-account',verifyAccount);
MainRoute.post('/forget-password',Forget_Password);
MainRoute.post('/change-password',Change_Password);
MainRoute.post('/update-access-token',Refresh_Token);
MainRoute.get('/email-verification/:userId', EmailVerification);
MainRoute.post('/change-password-fromProfile',verifyJsonWebToken,Change_Password_FromProfile)

MainRoute.get('/me',verifyJsonWebToken,User_Information)
MainRoute.get('/me_customer_info',verifyJsonWebToken,User_Customer_Information)
MainRoute.put('/update-user-info',verifyJsonWebToken,Update_Info);
MainRoute.put('/upload-image',verifyJsonWebToken,upload.single('picture'),handleImage);
MainRoute.put('/upload-image-base64',verifyJsonWebToken,handleimagebase64);

// MainRoute.put('/upload-image-base64',verifyJsonWebToken,express.json({ limit: '10mb' }),express.urlencoded({limit:'10mb', extended:true}),handleimagebase64);
// MainRoute.patch('/update-image',verifyJsonWebToken,upload.single('picture'),handleImage)
MainRoute.get('/logout-user',verifyJsonWebToken,Logout);
MainRoute.post('/add-customer',verifyJsonWebToken,Add_Customer);
MainRoute.get('/get-customer',verifyJsonWebToken,Get_Customer);
MainRoute.delete('/remove-customer',verifyJsonWebToken,Remove_customer);
MainRoute.put('/update-customer-info',verifyJsonWebToken,Update_customer_info);
MainRoute.get('/get-single-customer/:id',verifyJsonWebToken,Get_Single_Customer)
export default MainRoute