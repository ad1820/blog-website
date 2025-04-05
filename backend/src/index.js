import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";

dotenv.config()

connectDB()

const app = express()

app.listen(process.env.PORT || 8000, () => console.log(`Server started at port: ${process.env.PORT}`))