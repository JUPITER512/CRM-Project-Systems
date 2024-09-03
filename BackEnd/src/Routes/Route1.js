import express from "express";
import { Change_Password, Forget_Password, Refresh_Access_Token, Sign_in, Sign_up, Update_Info, verifyAccount } from "../Controller/Authentication.js";
import {verifyJsonWebToken} from '../Middlewear/verifyJwt.js'
import { Add_Customer, Get_Customer, Remove_customer, Update_customer_info } from "../Controller/Customer.js";
const MainRoute=express.Router();
MainRoute.post('/sign-up',Sign_up);
MainRoute.post('/sign-in',Sign_in);
MainRoute.post('/forget-password',Forget_Password);
MainRoute.get('/verify-account',verifyAccount);
MainRoute.post('/change-password',Change_Password);
MainRoute.put('/update-user-info',verifyJsonWebToken,Update_Info);
MainRoute.post('/update-access-token',Refresh_Access_Token)


MainRoute.post('/add-customer',verifyJsonWebToken,Add_Customer);
MainRoute.get('/get-customer',verifyJsonWebToken,Get_Customer);
MainRoute.delete('/remove-customer',verifyJsonWebToken,Remove_customer);
MainRoute.put('/update-customer-info',verifyAccount,Update_customer_info)
export default MainRoute