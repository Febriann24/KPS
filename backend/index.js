import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import PengajuanRoute from "./routes/PengajuanRoute.js"
import dotenv from "dotenv"
import coockieParser from "cookie-parser";

dotenv.config(); // middleware

const app = express()

app.use(cors({credentials:true, origin: "http://localhost:5173"}));

app.use(coockieParser());
app.use(express.json());
app.use(UserRoute);
app.use(PengajuanRoute);



app.listen(5000, ()=> console.log("Server is running..."));