import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const StatusSimpanan = db.define("MS_STATUS_SIMPANAN", {
    UUID_STATUS_SIMPANAN: {
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
    USR_CRT: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    USR_UPD: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    STATUS_CODE: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    STATUS_NAME: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    STATUS_DESC: {
        type: DataTypes.STRING(70),
        allowNull: true
    }
}, {
    freezeTableName: true
})

export default StatusSimpanan
console.log("Creating MS_STATUS_SIMPANAN");