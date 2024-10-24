import express from "express";
import multer from 'multer';
import {
    getAllBerita,
    getBeritaById,
    createBerita,
    updateBerita,
    deleteBerita,
    deleteAllBerita
} from "../controllers/BeritaController.js";

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get("/berita", getAllBerita);        
router.get("/berita/:id", getBeritaById);   
router.post('/berita', upload.single('fotoBerita'), createBerita);
router.patch("/berita/:id", updateBerita);  
router.delete("/berita/:id", deleteBerita);  
router.delete("/berita", deleteAllBerita); 

export default router;
