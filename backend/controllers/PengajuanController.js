import PengajuanPinjaman from "../models/TR_PENGAJUAN_PINJAMAN.js";
import StatusPinjaman from "../models/MS_STATUS_PINJAMAN.js";

export const getPengajuanPinjaman = async (req, res) => {
    try {
        const response = await PengajuanPinjaman.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
};


export const getStatusPinjaman = async(req, res) => {
    try{
        const response = await StatusPinjaman.findAll({
            where:{
                UUID_STATUS_PINJAMAN: req.params.id
            }
        });
        res.status(200).json(response);
    }
    catch(error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
}

export const createPengajuanPinjaman = async(req, res) => {
    const {pengajuanData, statusData} = req.body;
    try {
        const newStatus = await StatusPinjaman.create(statusData);
      
        const newPengajuan = {
            UUID_MS_STATUS_PINJAMAN: newStatus.UUID_STATUS_PINJAMAN,
            ...pengajuanData
        };
        await PengajuanPinjaman.create(newPengajuan); // Create record on TR_PENGAJUAN_PINJAMAN

        // Respond with the created records
        res.status(201).json({ 
            message: "Records created successfully", 
            pengajuan: newPengajuan, 
            status: newStatus 
        });

    } catch (error) {
        console.error("Error creating records:", error);
        res.status(500).json({ message: "Error creating records", error: error.message });
    }
}