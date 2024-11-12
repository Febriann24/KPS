import { Sequelize } from "sequelize";
import db from "../config/database.js";
import MS_JOB from './MS_JOB.js';
const { DataTypes } = Sequelize;

const MS_USER_APPROVE = db.define("MS_USER_APPROVE", { 
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
        defaultValue: DataTypes.NOW
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
        type: DataTypes.STRING(255),
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
        allowNull: false,
    },   
    refresh_token: {
        type: DataTypes.STRING,
    },
    IS_APPROVE: {
        type: DataTypes.INTEGER,
        allowNull: true
    }    
}, {
    freezeTableName: true 
});

MS_USER_APPROVE.belongsTo(MS_JOB, {
    foreignKey: 'UUID_MS_JOB',
    targetKey: 'UUID_MS_JOB'
});


(async () => {  
    try {
        await db.sync({ alter: true }); 
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing the database:", error);
    }
})();

export default MS_USER_APPROVE;

console.log("Creating MS_USER_APPROVE");
