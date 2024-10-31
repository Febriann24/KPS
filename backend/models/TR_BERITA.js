import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Berita = db.define("TR_BERITA", {
    UUID_BERITA: {
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
    USER_CRT: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    DTM_UPD: {
        type: DataTypes.DATE,
        allowNull: true
    },
    USER_UPD: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    UUID_MS_USER: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    JUDUL_BERITA: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    ISI_BERITA: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    FOTO_BERITA: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    freezeTableName: true
});


export default Berita;

console.log("Creating TR_BERITA");
(async () => {
    await db.sync({ alter: true });    
})();
