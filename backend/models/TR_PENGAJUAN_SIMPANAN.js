import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const PengajuanSimpanan = db.define("TR_PENGAJUAN_SIMPANAN", {
    UUID_PENGAJUAN_SIMPANAN: {
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
    UUID_MS_STATUS_SIMPANAN: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "MS_STATUS_SIMPANAN",
            key: "UUID_STATUS_SIMPANAN"
        }
    },
    UUID_MS_TYPE_SIMPANAN: {
        type: DataTypes.BIGINT,
        allowNull:false,
        references: {
            model: "MS_TYPE_SIMPANAN",
            key: "UUID_TYPE_SIMPANAN"
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
    NO_KONTRAK: {
        allowNull:true,
        type: DataTypes.STRING,
    },
    NOMINAL_UANG: {
        allowNull:false,
        type: DataTypes.BIGINT,
    },
    DESKRIPSI: {
        type: DataTypes.TEXT,
    },
}, {
    freezeTableName: true
});

(async () => {
    const { default: MS_USER } = await import('./MS_USER.js');
    const { default: MS_STATUS_SIMPANAN } = await import('./MS_STATUS_SIMPANAN.js');
    const { default: MS_TYPE_SIMPANAN } = await import('./MS_TYPE_SIMPANAN.js');

    PengajuanSimpanan.belongsTo(MS_USER, {
        foreignKey: 'UUID_MS_USER',
        targetKey: 'UUID_MS_USER',
        as: 'user'
    });

    PengajuanSimpanan.belongsTo(MS_STATUS_SIMPANAN, {
        foreignKey: 'UUID_MS_STATUS_SIMPANAN',
        targetKey: 'UUID_STATUS_SIMPANAN',
        as: 'status'
    });

    PengajuanSimpanan.belongsTo(MS_TYPE_SIMPANAN, {
        foreignKey: 'UUID_MS_TYPE_SIMPANAN',
        targetKey: 'UUID_TYPE_SIMPANAN',
        as: 'type'
    });
})();

export default PengajuanSimpanan;

console.log("Creating TR_PENGAJUAN_SIMPANAN");
