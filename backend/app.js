import express, { urlencoded } from "express";
import appRouter from "./routes/appRoute.js";
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// lets mount the routes
app.use('/eShop/v1/api',appRouter)

export default app;