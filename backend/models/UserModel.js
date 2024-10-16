import { Sequelize } from "sequelize";
import db from "../config/database.js"

const {DataTypes} = Sequelize;

const User = db.define("users", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING
}, {
    freezeTableName: true 
});

export default User;

//creates a new table "users" if "users" have not yet existed in database
console.log("Creating User Table");
(async()=>{
    await db.sync();
})();