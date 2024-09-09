import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import MainRoute from "./Routes/Route1.js";
// import cors from 'cors';
const app=express();
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(express.static('Public'));
app.use('/api',MainRoute);

export default app