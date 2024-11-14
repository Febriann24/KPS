import e from "express";
import { 
    getTotalPengeluaranAnggota,
 } from "../controllers/KeuanganController.js"

const router = e.Router();

router.get("/getTotalPengeluaranAnggota", getTotalPengeluaranAnggota);

export default router;

