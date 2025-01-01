import { Sequelize } from "sequelize";
import TrLobBerita from "./TR_LOB_BERITA.js";
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
        allowNull: true,
        references: {
            model: "MS_USER",
            key: "UUID_MS_USER"
        }
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

(async () => {
    const { default: MS_USER } = await import('./MS_USER.js');
    Berita.belongsTo(MS_USER, {
        foreignKey: 'UUID_MS_USER',
        targetKey: 'UUID_MS_USER',
        as: 'msUser'
    });

    Berita.hasMany(TrLobBerita, {
         foreignKey: 'UUID_BERITA',
         as: 'trLobBerita'  
    });
})();


export default Berita;

console.log("Creating TR_BERITA");