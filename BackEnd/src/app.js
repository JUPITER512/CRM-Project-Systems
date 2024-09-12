import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import MainRoute from "./Routes/Route1.js";
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(express.static('Public'));
app.use('/api',MainRoute);

export default app