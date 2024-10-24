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
    try {
        await Berita.create(req.body);
        res.status(201).json({ msg: "Berita Created Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error creating Berita", error: error.message });
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
