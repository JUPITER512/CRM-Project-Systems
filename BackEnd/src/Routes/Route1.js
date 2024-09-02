import express from "express";
import { Sign_up } from "../Controller/Authentication";
const AuthenticationRoute=express.Router();
AuthenticationRoute.post('/sign-up',Sign_up)
export default AuthenticationRoute