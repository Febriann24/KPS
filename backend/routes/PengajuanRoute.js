import express from "express";
import { 
    getPengajuanPinjaman,
    getStatusPinjaman,
    createStatusPinjaman,
} from "../controllers/PengajuanController.js";

const router = express.Router();

router.get("/TR_PENGAJUAN_PINJAMAN", getPengajuanPinjaman);
router.get("/MS_STATUS_PINJAMAN", getStatusPinjaman);
router.post("/MS_STATUS_PINJAMAN", createStatusPinjaman);

export default router;