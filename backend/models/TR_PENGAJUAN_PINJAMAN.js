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
        allowNull: false,
        references: {
            model: "MS_STATUS_PINJAMAN",
            key: "UUID_STATUS_PINJAMAN"
        }
    },
    UUID_MS_TYPE_PINJAMAN: {
        type: DataTypes.BIGINT,
        allowNull:false,
        references: {
            model: "MS_TYPE_PINJAMAN",
            key: "UUID_TYPE_PINJAMAN"
        }
    },
    UUID_MS_USER: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "MS_USER",
            key: "UUID_MS_USER"
        }
    },
    NOMINAL_UANG: {
        allowNull:false,
        type: DataTypes.BIGINT,
    },
    DESKRIPSI: {
        type: DataTypes.TEXT,
    }
}, {
    freezeTableName: true
});

(async () => {
    const { default: MS_USER } = await import('./MS_USER.js');
    const { default: MS_STATUS_PINJAMAN } = await import('./MS_STATUS_PINJAMAN.js');
    const { default: MS_TYPE_PINJAMAN } = await import('./MS_TYPE_PINJAMAN.js');

    PengajuanPinjaman.belongsTo(MS_USER, {
        foreignKey: 'UUID_MS_USER',
        targetKey: 'UUID_MS_USER',
        as: 'user'
    });

    PengajuanPinjaman.belongsTo(MS_STATUS_PINJAMAN, {
        foreignKey: 'UUID_MS_STATUS_PINJAMAN',
        targetKey: 'UUID_STATUS_PINJAMAN',
        as: 'status'
    });

    PengajuanPinjaman.belongsTo(MS_TYPE_PINJAMAN, {
        foreignKey: 'UUID_MS_TYPE_PINJAMAN',
        targetKey: 'UUID_TYPE_PINJAMAN',
        as: 'type'
    });
})();

export default PengajuanPinjaman;

console.log("Creating TR_PENGAJUAN_PINJAMAN");
