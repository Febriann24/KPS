import express from "express";
import { 
    getPengajuanPinjaman,
    getStatusPinjaman,
    getTypePinjaman,
    getDetailPengajuanPinjaman,
    createStatusPinjaman,
    createTypePinjaman,
    createPengajuanPinjaman,
} from "../controllers/PengajuanController.js";

const router = express.Router();

router.get("/TR_PENGAJUAN_PINJAMAN/general", getPengajuanPinjaman);
router.get("/TR_PENGAJUAN_PINJAMAN/detail", getDetailPengajuanPinjaman);
router.get("/MS_STATUS_PINJAMAN", getStatusPinjaman);
router.get("/MS_TYPE_PINJAMAN", getTypePinjaman);

router.post("/MS_STATUS_PINJAMAN", createStatusPinjaman);
router.post("/MS_TYPE_PINJAMAN", createTypePinjaman);
router.post("/TR_PENGAJUAN_PINJAMAN", createPengajuanPinjaman);

export default router;