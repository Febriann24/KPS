import express from "express";
import { 
    getPengajuan,
    getStatusPinjaman,
    getTypePinjaman,
    getDetailPengajuanPinjaman,
    getOneDetailPengajuanPinjaman,
    createStatusPinjaman,
    createTypePinjaman,
    createPengajuanPinjaman,
    updateStatusPengajuanPinjaman,
    getOneTypePinjaman,
    getActivePengajuanPinjamanAnggota,
 } from "../controllers/PengajuanController.js";

const router = express.Router();

router.post("/getPengajuan", getPengajuan);
router.get("/TR_PENGAJUAN_PINJAMAN/getDetailPengajuanPinjaman/", getDetailPengajuanPinjaman);
router.get("/TR_PENGAJUAN_PINJAMAN/getDetailPengajuanPinjaman/:id", getOneDetailPengajuanPinjaman);
router.get("/TR_PENGAJUAN_PINJAMAN/getDetailPengajuanPinjaman/anggotaId/:id", getDetailPengajuanPinjaman);
router.get("/MS_STATUS_PINJAMAN/getStatusPinjaman", getStatusPinjaman);
router.get("/MS_TYPE_PINJAMAN/getTypePinjaman", getTypePinjaman);
router.get("/getOneTypePinjaman", getOneTypePinjaman);
router.get("/getActivePengajuanPinjamanAnggota/:id/:month/:year", getActivePengajuanPinjamanAnggota);

router.post("/MS_STATUS_PINJAMAN/createStatusPinjaman", createStatusPinjaman);
router.post("/MS_TYPE_PINJAMAN/createTypePinjaman", createTypePinjaman);
router.post("/TR_PENGAJUAN_PINJAMAN/createPengajuanPinjaman", createPengajuanPinjaman);
router.patch("/TR_PENGAJUAN_PINJAMAN/updateStatusPengajuanPinjaman", updateStatusPengajuanPinjaman);


export default router;