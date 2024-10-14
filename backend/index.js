import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import PengajuanRoute from "./routes/PengajuanRoute.js"
import { setupAssociations } from "./models/associations.js";

const app = express()
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(PengajuanRoute);

app.listen(5000, ()=> console.log("Server is running..."));