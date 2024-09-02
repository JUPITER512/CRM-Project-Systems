import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import AuthenticationRoute from "./Routes/Route1.js";
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));
app.use('/api',AuthenticationRoute)

export default app