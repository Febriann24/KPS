import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import PengajuanRoute from "./routes/PengajuanRoute.js";
import BeritaRoute from "./routes/BeritaRoute.js";
import UserApproveRoute from "./routes/UserApproveRoute.js";

dotenv.config(); // Load environment variables

const app = express();

// CORS configuration with credentials
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Middleware for parsing cookies and request bodies
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Route handlers
app.use(UserRoute);
app.use(PengajuanRoute);
app.use(BeritaRoute);
app.use(UserApproveRoute);

// Start the server
app.listen(5000, () => console.log("Server is running..."));
