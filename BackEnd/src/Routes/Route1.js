import express from "express";
import { Change_Password, Forget_Password, Sign_in, Sign_up, verifyAccount } from "../Controller/Authentication.js";
import {verifyJsonWebToken} from '../Middlewear/verifyJwt.js'
import { Add_Customer, Get_Customer } from "../Controller/Customer.js";
const MainRoute=express.Router();
MainRoute.post('/sign-up',Sign_up);
MainRoute.post('/sign-in',Sign_in);
MainRoute.post('/forget-password',Forget_Password);
MainRoute.get('/verify-account',verifyAccount);
MainRoute.post('/change-password',Change_Password);



MainRoute.post('/add-customer',verifyJsonWebToken,Add_Customer);
MainRoute.get('/get-customer',verifyJsonWebToken,Get_Customer);
MainRoute.delete('/remove-customer',verifyJsonWebToken,)
export default MainRoute