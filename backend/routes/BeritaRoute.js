import express from "express";
import Berita from '../models/TR_BERITA.js';
import cors from 'cors';

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

const router = express.Router();

router.get("/berita", getAllBerita);        
router.get("/showBerita/:id", getBeritaById);   
router.post('/berita', async (req, res) => {
    const { judulBerita, penulis, kontenBerita, fotoBerita } = req.body;

    if (!judulBerita || !penulis || !kontenBerita || !fotoBerita) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newBerita = await Berita.create({
            JUDUL_BERITA: judulBerita,
            ISI_BERITA: kontenBerita,
            USER_UPD: penulis,
            FOTO_BERITA: fotoBerita,
            IS_DELETED: 0
        });

        res.status(201).json({ message: 'Berita created successfully', newBerita });
    } catch (error) {
        console.error('Error creating berita:', error);
        res.status(500).json({ message: 'Error creating berita', error: error.message });
    }
});

router.delete("/deleteBerita/:id", deleteBerita);  
router.delete("/berita", deleteAllBerita); 

router.patch("/updateBerita/:id", async (req, res) => {
    console.log('Update route hit for ID:', req.params.id);
    console.log('Request body:', req.body);

    const { judulBerita, penulis, kontenBerita, fotoBerita } = req.body;

    console.log('Judul Berita:', judulBerita);
    console.log('Penulis:', penulis);
    console.log('Konten Berita:', kontenBerita);
    console.log('Foto Berita:', fotoBerita);

    if (!judulBerita && !kontenBerita && !fotoBerita) {
        return res.status(400).json({ message: 'At least one field (judulBerita, kontenBerita, fotoBerita) is required to update' });
    }

    try {
        const beritaId = req.params.id;
        const berita = await Berita.findOne({ where: { UUID_BERITA: beritaId } });

        if (!berita) {
            return res.status(404).json({ message: 'Berita not found' });
        }

        const updatedData = {
            JUDUL_BERITA: judulBerita || berita.JUDUL_BERITA,
            ISI_BERITA: kontenBerita || berita.ISI_BERITA,
            USER_UPD: penulis || berita.USER_UPD,
            IS_DELETED: 0,
            FOTO_BERITA: fotoBerita || berita.FOTO_BERITA 
        };

        if (fotoBerita && !fotoBerita.startsWith('data:image/')) {
            return res.status(400).json({ message: 'Invalid base64 image format' });
        }

        console.log('Updating with data:', updatedData);

        const result = await Berita.update(updatedData, { where: { UUID_BERITA: beritaId } });

        if (result[0] === 0) {
            return res.status(404).json({ message: 'No rows updated. Berita may not exist or no changes made.' });
        }

        res.status(200).json({ msg: 'Berita Updated Successfully' });
    } catch (error) {
        console.error('Error updating berita:', error);
        res.status(500).json({ message: 'Error updating Berita', error: error.message });
    }
});


export default router;