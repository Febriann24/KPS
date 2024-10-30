import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const TypePinjaman = db.define("MS_TYPE_PINJAMAN", {
    UUID_TYPE_PINJAMAN: {
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
    TYPE_NAME: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    TYPE_DESC: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    MINIMUM_PINJAMAN: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    MAXIMUM_PINJAMAN: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    ANGSURAN_MONTH: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
})

export default TypePinjaman;

console.log("Creating MS_TYPE_PINJAMAN");
(async () => {
    await db.sync();    
})();
