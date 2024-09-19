import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import MainRoute from "./Routes/Route1.js";
// import path from 'path'
// import { fileURLToPath } from "url";
// const __filename=fileURLToPath(import.meta.url);
// const __dirname=path.dirname(__filename);
// console.log(path.join(__dirname,'views'))
const app=express();
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(morgan('combined'));
app.use(express.static('Public'));
app.use('/api',MainRoute);

export default app