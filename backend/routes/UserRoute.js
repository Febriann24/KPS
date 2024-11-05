import express from "express";
import {
    getUsers,
    Register,
    Login,
    Logout // Tambahkan fungsi ini
} from "../controllers/UserController.js"; // Pastikan Anda menambahkan fungsi ini di controller Anda
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";


const router = express.Router();


// Rute CRUD pengguna yang sudah ada


// Rute untuk registrasi dan login
router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
