import PengajuanPinjaman from "../models/TR_PENGAJUAN_PINJAMAN.js";
import StatusPinjaman from "../models/MS_STATUS_PINJAMAN.js";
import TypePinjaman from "../models/MS_TYPE-PINJAMAN.js";

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
    try {
        const response = await StatusPinjaman.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
}

export const getTypePinjaman = async(req, res) => {
    try {
        const response = await TypePinjaman.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
}

export const createStatusPinjaman = async (req, res) => {
    try {
        const createdStatuses = await StatusPinjaman.bulkCreate(req.body); // Use bulkCreate to create multiple records
        res.status(201).json({ msg: "Status Pinjaman Created Successfully", data: createdStatuses });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error creating data", error: error.message });
    }
}

export const createTypePinjaman = async (req, res) => {
    try {
        const createdTypePinjaman = await TypePinjaman.bulkCreate(req.body); // Use bulkCreate to create multiple records
        res.status(201).json({ msg: "Type Pinjaman Created Successfully", data: createdTypePinjaman });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error creating data", error: error.message });
    }
}

export const createPengajuanPinjaman = async (req, res) => {
    try {
        const createdPengajuanPinjaman = await PengajuanPinjaman.create(req.body);
        res.status(201).json({ msg: "Type Pinjaman Created Successfully", data: createdPengajuanPinjaman });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error creating data", error: error.message });
    }
}