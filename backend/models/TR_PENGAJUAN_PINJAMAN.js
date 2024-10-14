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
    }
}, {
    freezeTableName: true // Prevent Sequelize from pluralizing the table name
});

export default PengajuanPinjaman;

// Sync the model with the database (use cautiously in production)
console.log("Creating TR_PENGAJUAN_PINJAMAN");
(async () => {  
    await db.sync(); // Use { force: true } to drop and recreate
})();
