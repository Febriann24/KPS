import express from "express";
import { 
    getPengajuanPinjaman,
    getStatusPinjaman,
    createPengajuanPinjaman,
    
} from "../controllers/PengajuanController.js";

const router = express.Router();

router.get("/TR_PENGAJUAN_PINJAMAN", getPengajuanPinjaman);
router.get("/MS_STATUS_PINJAMAN/:id", getStatusPinjaman);
router.post("/TR_PENGAJUAN_PINJAMAN", createPengajuanPinjaman);

export default router;