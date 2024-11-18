import db from "../config/database.js"
import PengajuanPinjaman from "../models/TR_PENGAJUAN_PINJAMAN.js";
import StatusPinjaman from "../models/MS_STATUS_PINJAMAN.js";
import PengajuanSimpanan from "../models/TR_PENGAJUAN_SIMPANAN.js";
import TypeSimpanan from "../models/MS_TYPE_SIMPANAN.js";
import StatusSimpanan from "../models/MS_STATUS_SIMPANAN.js";
import User from "../models/MS_USER.js"
import TypePinjaman from "../models/MS_TYPE_PINJAMAN.js";
import { countDeduksiBulan } from "../../src/utils/utils.js";
import Sequelize from "sequelize";
import { Op } from "sequelize";

export const getPengajuan = async (req, res) => {
    const { 
        PENGAJUAN, 
        UUID_MS_TYPE,
        UUID_MS_STATUS,
        UUID_MS_USER,
    } = req.body;

    let filter = {};

    const include = [
        {
            model: User,
            as: 'user',
            attributes: ['NAMA_LENGKAP']
        }
    ]

    switch(PENGAJUAN) {
        case "PINJAMAN":
            include.push(
                {
                    model: StatusPinjaman,
                    as: 'status',
                    attributes: ['UUID_STATUS_PINJAMAN', 'STATUS_CODE', "STATUS_NAME"]
                },
                {
                    model: TypePinjaman,
                    as: 'type',
                    attributes: ['UUID_TYPE_PINJAMAN', 'TYPE_NAME', 'MINIMUM_PINJAMAN', 'MAXIMUM_PINJAMAN', 'ANGSURAN_MONTH', "BUNGA_PERCENTAGE"]
                }
            )
            break;
        case "PINJAMAN":
            include.push(
                {
                    model: StatusSimpanan,
                    as: 'status',
                    attributes: ['UUID_STATUS_SIMPANAN', 'STATUS_CODE', "STATUS_NAME"]
                },
                {
                    model: TypeSimpanan,
                    as: 'type',
                    attributes: ['UUID_TYPE_SIMPANAN', 'TYPE_NAME', 'MINIMUM_SIMPANAN', 'MAXIMUM_SIMPANAN', 'ANGSURAN_MONTH', "BUNGA_PERCENTAGE"]
                }
            )
            break;
    }

    const pengajuanModel = {
        "PINJAMAN": PengajuanPinjaman,
        "SIMPANAN": PengajuanSimpanan
    }

    if(UUID_MS_TYPE) filter[`UUID_MS_TYPE_${PENGAJUAN}`] = UUID_MS_TYPE;
    if(UUID_MS_STATUS) filter[`UUID_MS_STATUS_${PENGAJUAN}`] = UUID_MS_STATUS;
    if(UUID_MS_USER) filter.UUID_MS_USER = UUID_MS_USER;

    try {
        const response = await pengajuanModel[PENGAJUAN].findAll({ where:filter,include });
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
                    attributes: ['UUID_TYPE_PINJAMAN', 'TYPE_NAME', 'MINIMUM_PINJAMAN', 'MAXIMUM_PINJAMAN', 'ANGSURAN_MONTH', "BUNGA_PERCENTAGE"]
                }
            ],
            attributes: [
                'UUID_PENGAJUAN_PINJAMAN',
                'NOMINAL_UANG',
                'DESKRIPSI',
                'DTM_CRT',
                "DTM_APPROVED"
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
                    attributes: ['UUID_TYPE_PINJAMAN', 'TYPE_NAME', 'MINIMUM_PINJAMAN', 'MAXIMUM_PINJAMAN', 'ANGSURAN_MONTH', "BUNGA_PERCENTAGE"]
                }
            ],
            attributes: [
                'UUID_PENGAJUAN_PINJAMAN',
                'NOMINAL_UANG',
                'DESKRIPSI',
                'DTM_CRT',
                "DTM_APPROVED"
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
        const updateField = {
            UUID_MS_STATUS_PINJAMAN: UUID_STATUS.UUID_STATUS_PINJAMAN
        }
        if (status == "APPROVED"){
            updateField.DTM_APPROVED = new Date()
        };
        const updatedPengajuanPinjaman = await PengajuanPinjaman.update(
            updateField, {
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

export const getActivePengajuanPinjamanAnggota = async (req, res) => {
    const { id, month, year } = req.params;
    try {
        const UUID_STATUS = await StatusPinjaman.findOne({ where: { STATUS_CODE: "APPROVED" } });
        const uuid_status = UUID_STATUS.UUID_STATUS_PINJAMAN;

        let query = `
            SELECT
            p."UUID_PENGAJUAN_PINJAMAN",
            p."DESKRIPSI",
            p."NOMINAL_UANG",
            s."UUID_STATUS_PINJAMAN",
            s."STATUS_CODE",
            t."UUID_TYPE_PINJAMAN",
            t."TYPE_NAME",
            t."ANGSURAN_MONTH",
            t."BUNGA_PERCENTAGE",
            u."UUID_MS_USER",
            u."NAMA_LENGKAP"
            FROM "TR_PENGAJUAN_PINJAMAN" p
            JOIN "MS_STATUS_PINJAMAN" s on p."UUID_MS_STATUS_PINJAMAN" = s."UUID_STATUS_PINJAMAN"
            JOIN "MS_TYPE_PINJAMAN" t on p."UUID_MS_TYPE_PINJAMAN" = t."UUID_TYPE_PINJAMAN"
            JOIN "MS_USER" u on p."UUID_MS_USER" = u."UUID_MS_USER"
            WHERE p."UUID_MS_STATUS_PINJAMAN" = :uuid_status
            AND p."DTM_APPROVED" is not NULL
            AND :month in (
            SELECT month
            FROM generate_series(
                EXTRACT(MONTH FROM p."DTM_APPROVED") + (EXTRACT(YEAR FROM p."DTM_APPROVED") - :year) * 12,
                EXTRACT(MONTH FROM p."DTM_APPROVED") + t."ANGSURAN_MONTH" - 1 + (EXTRACT(YEAR FROM p."DTM_APPROVED") - :year) * 12
            ) as month ) 
        `;

        const replacements = { uuid_status, month, year }

        if (id) {
            query += ' AND p."UUID_MS_USER" = :id';
            replacements.id = id;
        }

        const [data, metadata] = await db.query(query, {
            replacements: replacements
        })

        let totalDeduksi = 0;

        const processedData = data.map(row => {
            const nominal = parseFloat(row.NOMINAL_UANG);
            const bunga = parseFloat(row.BUNGA_PERCENTAGE);
            const bulan = row.ANGSURAN_MONTH;

            const deduksiBulanan = countDeduksiBulan(nominal, bunga, bulan);

            totalDeduksi += parseFloat(deduksiBulanan);

            return {
                ...row,
                DEDUKSI_BULANAN: deduksiBulanan
            }
        });

        res.status(200).json({processedData, TOTAL_DEDUKSI_BULANAN: totalDeduksi})
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message }); 
    }
}