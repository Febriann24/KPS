import db from "../config/database.js"
import PengajuanPinjaman from "../models/TR_PENGAJUAN_PINJAMAN.js";
import StatusPinjaman from "../models/MS_STATUS_PINJAMAN.js";
import User from "../models/MS_USER.js"
import TypePinjaman from "../models/MS_TYPE_PINJAMAN.js";

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

export const getOneTypePinjaman = async(req, res) => {
    const { TYPE_NAME } = req.body;
    try {
        const response = await TypePinjaman.findOne({
            where: {
                TYPE_NAME: TYPE_NAME
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
}

export const getDetailPengajuanPinjaman = async (req, res) => {
    const { id } = req.params;
    let filter = {}
    if (id) {
        filter = {
            UUID_MS_USER: id
        }
    }
    try {
        const results = await PengajuanPinjaman.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['NAMA_LENGKAP', 'UUID_MS_USER']
                },
                {
                    model: StatusPinjaman,
                    as: 'status',
                    attributes: ['UUID_STATUS_PINJAMAN', 'STATUS_CODE', "STATUS_NAME"]
                },
                {
                    model: TypePinjaman,
                    as: 'type',
                    attributes: ['UUID_TYPE_PINJAMAN', 'TYPE_NAME', 'MINIMUM_PINJAMAN', 'MAXIMUM_PINJAMAN']
                }
            ],
            attributes: [
                'UUID_PENGAJUAN_PINJAMAN',
                'NOMINAL_UANG',
                'DESKRIPSI',
                'DTM_CRT'
            ],
            where: filter
        });

        res.status(200).json(results);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
};

export const getOneDetailPengajuanPinjaman = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await PengajuanPinjaman.findOne({
            where: {
                UUID_PENGAJUAN_PINJAMAN: id
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['NAMA_LENGKAP', 'ALAMAT', 'DTM_CRT', 'NOMOR_TELP']
                },
                {
                    model: StatusPinjaman,
                    as: 'status',
                    attributes: ['UUID_STATUS_PINJAMAN', 'STATUS_CODE', "STATUS_NAME"]
                },
                {
                    model: TypePinjaman,
                    as: 'type',
                    attributes: ['UUID_TYPE_PINJAMAN', 'TYPE_NAME', 'MINIMUM_PINJAMAN', 'MAXIMUM_PINJAMAN', 'ANGSURAN_MONTH']
                }
            ],
            attributes: [
                'UUID_PENGAJUAN_PINJAMAN',
                'NOMINAL_UANG',
                'DESKRIPSI',
                'DTM_CRT'
            ]
        });

        res.status(200).json(results);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
};

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
        res.status(201).json(createdPengajuanPinjaman);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error creating data", error: error.message });
    }
}

export const updateStatusPengajuanPinjaman = async (req, res) => {
    try {
        const { id, status } = req.body;
        const UUID_STATUS = await StatusPinjaman.findOne({ where: { STATUS_CODE: status } });
        const updatedPengajuanPinjaman = await PengajuanPinjaman.update(
            {
                UUID_MS_STATUS_PINJAMAN: UUID_STATUS.UUID_STATUS_PINJAMAN
            }, {
                where: {
                    UUID_PENGAJUAN_PINJAMAN: id
                }
            }
        );
        res.status(201).json({ msg: "Status Pinjaman Updated Successfully", data: updatedPengajuanPinjaman });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error creating data", error: error.message });        
    }
}