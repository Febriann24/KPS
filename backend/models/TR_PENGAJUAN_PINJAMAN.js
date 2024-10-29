import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const PengajuanPinjaman = db.define("TR_PENGAJUAN_PINJAMAN", {
    UUID_PENGAJUAN_PINJAMAN: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    DTM_CRT: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    USR_CRT: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    DTM_UPD: {
        type: DataTypes.DATE,
        allowNull: true
    },
    USR_UPD: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    UUID_MS_STATUS_PINJAMAN: {
        type: DataTypes.BIGINT,
        allowNull:false,
        references: {
            model: "MS_STATUS_PINJAMAN",
            key: "UUID_STATUS_PINJAMAN"
        }
    },
    NAMA_LENGKAP: {
        type: DataTypes.STRING(100),
    },
    ALAMAT: {
        type: DataTypes.STRING(255),
    },
    NOMOR_TELEPON: {
        type: DataTypes.BIGINT,
    },
    NOMOR_ANGGOTA: {
        type: DataTypes.STRING(50),
    },
    NOMINAL_UANG: {
        type: DataTypes.BIGINT,
    },
    NOMOR_REKENING: {
        type: DataTypes.BIGINT,
    },
    BANK: {
        type: DataTypes.STRING(100),
    },
    ANGSURAN: {
        type: DataTypes.INTEGER,
    },
    DESKRIPSI: {
        type: DataTypes.TEXT,
    }
}, {
    freezeTableName: true
});

export default PengajuanPinjaman;

console.log("Creating TR_PENGAJUAN_PINJAMAN");
(async () => {  
    await db.sync();
})();
