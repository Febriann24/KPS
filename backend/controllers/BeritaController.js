import Berita from "../models/TR_BERITA.js"; 

export const getAllBerita = async (req, res) => {
    try {
        const response = await Berita.findAll();
        res.status(200).json(response);
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
    console.log(req.body);
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
        const berita = await Berita.findOne({ where: { UUID_BERITA: req.params.id } });
        if (berita) {
            await Berita.update(req.body, {
                where: {
                    UUID_BERITA: req.params.id
                }
            });
            res.status(200).json({ msg: "Berita Updated Successfully" });
        } else {
            res.status(404).json({ message: "Berita not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error updating Berita", error: error.message });
    }
};

export const deleteBerita = async (req, res) => {
    try {
        const berita = await Berita.findOne({
            where: { UUID_BERITA: req.params.id }
        });
        if (berita) {
            await Berita.update(
                { IS_DELETED_: 1 },
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
