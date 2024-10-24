import express from "express";
import {
    getAllBerita,
    getBeritaById,
    createBerita,
    updateBerita,
    deleteBerita,
    deleteAllBerita
} from "../controllers/BeritaController.js";

const router = express.Router();

router.get("/berita", getAllBerita);        
router.get("/berita/:id", getBeritaById);   
router.post("/berita", createBerita);       
router.patch("/berita/:id", updateBerita);  
router.delete("/berita/:id", deleteBerita);  
router.delete("/berita", deleteAllBerita); 

export default router;
