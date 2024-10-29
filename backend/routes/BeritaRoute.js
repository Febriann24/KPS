import express from "express";
import multer from 'multer';
import Berita from '../models/TR_BERITA.js';
import cors from 'cors';
import path from 'path';

import {
    getAllBerita,
    getBeritaById,
    createBerita,
    updateBerita,
    deleteBerita,
    deleteAllBerita
} from "../controllers/BeritaController.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/upload', express.static(path.join(process.cwd(), 'upload')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../src/component/upload/');
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + file.originalname;
        cb(null, filename);
    }
});
const upload = multer({ storage });

app.post('/upload', upload.single('fotoBerita'), (req, res) => {
    res.status(200).json({ filename: req.file.filename });
});

const router = express.Router();

router.get("/berita", getAllBerita);        
router.get("/showBerita/:id", getBeritaById);   
router.post('/berita', upload.single('fotoBerita'), createBerita);
router.delete("/deleteBerita/:id", deleteBerita);  
router.delete("/berita", deleteAllBerita); 
router.patch("/updateBerita/:id", upload.single('fotoBerita'), async (req, res) => {
    console.log('Update route hit for ID:', req.params.id);

    try {
        const beritaId = req.params.id;
        const berita = await Berita.findOne({ where: { UUID_BERITA: beritaId } });
        if (!berita) {
            return res.status(404).json({ message: 'Berita not found' });
        }

        const updatedData = {
            JUDUL_BERITA: req.body.judulBerita || berita.JUDUL_BERITA,
            ISI_BERITA: req.body.kontenBerita || berita.ISI_BERITA,
            USER_UPD: req.body.penulis || berita.USER_UPD,
            FOTO_BERITA: req.file ? `${req.file.filename}` : berita.FOTO_BERITA,
            IS_DELETED: 0
        };

        console.log('Updating with data:', updatedData);

        const result = await Berita.update(updatedData, { where: { UUID_BERITA: beritaId } });
        console.log('Update result:', result);

        if (result[0] === 0) {
            return res.status(404).json({ message: 'No rows updated. Berita may not exist.' });
        }

        res.status(200).json({ msg: 'Berita Updated Successfully' });
    } catch (error) {
        console.error('Error updating berita:', error);
        res.status(500).json({ message: 'Error updating Berita', error: error.message });
    }
});

export default router;
