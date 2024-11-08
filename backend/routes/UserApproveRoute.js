// routes/userApproveRoutes.js
import express from "express";
import {
    getPendingApprovals,
    approveUser,
    rejectUser,
    createUserApproval
} from "../controllers/UserApproveController.js";

const router = express.Router();

router.get("/approvals", getPendingApprovals);
router.put("/approve/:id", approveUser);
router.delete("/reject/:id", rejectUser);
router.post("/approvals", createUserApproval);

export default router;
