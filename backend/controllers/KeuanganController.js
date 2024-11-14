import PengajuanPinjaman from "../models/TR_PENGAJUAN_PINJAMAN.js";
import StatusPinjaman from "../models/MS_STATUS_PINJAMAN.js";
import TypePinjaman from "../models/MS_TYPE_PINJAMAN.js";
import { Op, Sequelize } from "sequelize";

export const getTotalPengeluaranAnggota = async (req, res) => {
    try {
        const { anggotaId, month, year } = req.body;
        const uuid_status = await StatusPinjaman.findOne({
            where: {
                STATUS_CODE: "APPROVED"
            },
            attributes: ["UUID_STATUS_PINJAMAN"]
        });

        let filter = {
            UUID_MS_STATUS_PINJAMAN: uuid_status.UUID_STATUS_PINJAMAN
        };

        // Add UUID_MS_USER filter if anggotaId is provided
        if (anggotaId) {
            filter.UUID_MS_USER = anggotaId;
        }

        // Initialize the createdAt filter with an empty array to combine month and year
        filter.createdAt = {};

        // Add month filter if provided
        if (month) {
            filter.createdAt[Op.and] = filter.createdAt[Op.and] || [];
            filter.createdAt[Op.and].push(
                Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "createdAt"')), '=', month)
            );
        }

        // Add year filter if provided (otherwise default to current year)
        if (year) {
            filter.createdAt[Op.and] = filter.createdAt[Op.and] || [];
            filter.createdAt[Op.and].push(
                Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "createdAt"')), '=', year)
            );
        } else {
            const thisYear = new Date().getFullYear(); // Default to current year
            filter.createdAt[Op.and] = filter.createdAt[Op.and] || [];
            filter.createdAt[Op.and].push(
                Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "createdAt"')), '=', thisYear)
            );
        }

        // Execute the query and get the sum of total_UANG
        const total = await PengajuanPinjaman.sum("NOMINAL_UANG", {
            where: filter
        });

        const typePinjaman = await TypePinjaman.findAll({
            attributes: ["UUID_TYPE_PINJAMAN", "TYPE_NAME"]
        });
        let totalEachType = {};
        for (let type of typePinjaman) {
            totalEachType[type.UUID_TYPE_PINJAMAN] = {
                UUID_MS_TYPE_PINJAMAN: type.UUID_TYPE_PINJAMAN,
                TYPE_NAME: type.TYPE_NAME,
                TOTAL: await PengajuanPinjaman.sum("NOMINAL_UANG", {
                    where: {
                        ...filter,
                        UUID_MS_TYPE_PINJAMAN: type.UUID_TYPE_PINJAMAN,
                    }
                })
            };
        }

        // Send the response with the total, month, and year
        res.status(200).json({
            anggota: anggotaId || 'all',
            total: total || 0,
            month: month || '1-12',
            year: year || new Date().getFullYear(),
            type: totalEachType
        });
    } catch (error) {
        console.log("Error found: ", error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
};
