import Berita from "../models/TR_BERITA.js"; 

export const getAllBerita = async (req, res) => {
    try {
        const response = await Berita.findAll({ where: {IS_DELETED: 0 } });
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
};

export const getBeritaById = async (req, res) => {
    try {
        const response = await Berita.findOne({
            where: {
                UUID_BERITA: req.params.id
            }
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: "Berita not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
};

export const createBerita = async (req, res) => {
    const { judulBerita, kontenBerita, penulis } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded or file is not a PNG or JPG!" });
    }

    try {
        const newBerita = await Berita.create({
            JUDUL_BERITA: judulBerita, 
            ISI_BERITA: kontenBerita,
            FOTO_BERITA: req.file.filename,
            USER_UPD: penulis, 
            IS_DELETED: 0,
            DTM_CRT: new Date(),
            USER_CRT: req.user ? req.user.id : null,
        });
        return res.status(201).json(newBerita);
    } catch (error) {
        console.error("Error creating berita:", error);
        return res.status(500).json({ message: "Failed to create berita.", error: error.message });
    }
};

export const updateBerita = async (req, res) => {
    try {
        const beritaId = req.params.id;
        const berita = await Berita.findOne({ where: { UUID_BERITA: beritaId } });

        if (!berita) {
            return res.status(404).json({ message: "Berita not found" });
        }
        console.log('Existing berita:', berita);

        const updatedData = {
            JUDUL_BERITA: req.body.judulBerita || berita.JUDUL_BERITA,
            ISI_BERITA: req.body.kontenBerita || berita.ISI_BERITA,
            USER_UPD: req.body.penulis || berita.USER_UPD,
            FOTO_BERITA: req.file ? `upload/${req.file.filename}` : berita.FOTO_BERITA,
            IS_DELETED: 0
        };

        console.log('Updating with data:', updatedData);

        const result = await Berita.update(updatedData, { where: { UUID_BERITA: beritaId } });
        console.log('Update result:', result);

        if (result[0] === 0) {
            return res.status(404).json({ message: 'No rows updated. Berita may not exist or no changes made.' });
        }

        res.status(200).json({ msg: 'Berita Updated Successfully' });
    } catch (error) {
        console.error('Error updating berita:', error);
        res.status(500).json({ message: 'Error updating Berita', error: error.message });
    }
};

export const deleteBerita = async (req, res) => {
    try {
        const berita = await Berita.findOne({
            where: { UUID_BERITA: req.params.id }
        });
        if (berita) {
            await Berita.update(
                { IS_DELETED: 1 },
                { where: { UUID_BERITA: req.params.id } }
            );
            res.status(200).json({ msg: "Berita Deleted Successfully (Soft Delete)" });
        } else {
            res.status(404).json({ message: "Berita not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error deleting Berita", error: error.message });
    }
};

export const deleteAllBerita = async (req, res) => {
    try {
        const response = await Berita.destroy({
            where: {}
        });
        res.status(200).json({ msg: response + " Berita Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error deleting Berita", error: error.message });
    }
};
