import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const MS_USER = db.define("MS_USER", { 
    UUID_MS_USER: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    IS_ACTIVE: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    IS_DELETED: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    DTM_CRT: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW // Default to current date and time
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
    NOMOR_TELP: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    EMAIL: {
        type: DataTypes.STRING(70),
        allowNull: false
    },
    PASSWORD: {
        type: DataTypes.STRING(255), // Password akan di-hash
        allowNull: false
    },
    NAMA_LENGKAP: {
        type: DataTypes.STRING(70), 
        allowNull: false
    },
    TANGGAL_LAHIR: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW 
    },
    ALAMAT: {
        type: DataTypes.STRING(100), 
        allowNull: true
    },
    UUID_MS_JOB: {
        type: DataTypes.BIGINT,
        allowNullValue: false,
        forenkey: true
    },
    ROLE: {
        type: DataTypes.STRING(20),
        allowNull: false
    },    
    refresh_token: {
        type: DataTypes.STRING,
    }      
}, {
    freezeTableName: true 
});

// Sync the model with the database (use cautiously in production)
console.log("Creating MS_USER");
(async () => {  
    await db.sync({ alter: true }); 
})();

export default MS_USER;
