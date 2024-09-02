import express from "express";
import { Sign_in, Sign_up } from "../Controller/Authentication.js";
const AuthenticationRoute=express.Router();
AuthenticationRoute.post('/sign-up',Sign_up);
AuthenticationRoute.post('/sign-in',Sign_in);

export default AuthenticationRoute