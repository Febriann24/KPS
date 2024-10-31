import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import PengajuanRoute from "./routes/PengajuanRoute.js";
import BeritaRoute from "./routes/BeritaRoute.js";

const app = express();
app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(UserRoute);
app.use(PengajuanRoute);
app.use(BeritaRoute);

app.listen(5000, () => console.log("Server is running..."));
