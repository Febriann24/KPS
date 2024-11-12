import express from "express";
import {
    getUsers,
    UserData,
    Register,
    Login,
    Logout,
    approveUser,
    rejectUser,
    UserApproval
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.get("/user", UserData);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.put("/approve/:id", approveUser);
router.delete("/reject/:id", rejectUser);
router.get("/approval", UserApproval);

export default router;
