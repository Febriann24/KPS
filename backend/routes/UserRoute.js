import express from "express";
import {
    getUsers,
    registerUser,
    loginUser,
    Logout // Tambahkan fungsi ini
} from "../controllers/UserController.js"; // Pastikan Anda menambahkan fungsi ini di controller Anda
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";


const router = express.Router();


// Rute CRUD pengguna yang sudah ada


// Rute untuk registrasi dan login
router.get("/MS_USER", verifyToken,  getUsers);
router.post("/MS_USER", registerUser);
router.post("/login", loginUser);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
