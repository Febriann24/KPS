import db from "../config/database.js"
import MsGeneralSetting from "../models/MS_GENERALSETTING.js";
import MS_USER from "../models/MS_USER.js"
import Sequelize from "sequelize";
import { Op } from "sequelize";

export const getAllGenset = async (req,res) => {
    try{
        const response = await MsGeneralSetting.findAll();
        res.status(200).json(response);
    }catch(e){
        console.log(e);
    }
}

export const getOneGenset = async(req,res) => {
    try {
        const response = await MsGeneralSetting.findOne({
            where:{
                UUID_SETTING: req.params.id
            }
        });
        res.status(200).json(response);
    }catch(e){
        console.log(e);
    }
}

export const updateGenset = async (req,res) => {
    try{
        const response = await MsGeneralSetting.update(
            req.body,
            {where:{UUID_SETTING: req.params.id}} 
        );
        res.status(200).json(response);
    }catch(e){
        console.log(e);
    }
}

export const getGensetFiltered = async (req,res) => {
    const { searchByValue, searchQueryValue, advancedFilters } = req.body;

    try{
        let stringQuery = `SELECT * FROM "MS_GENERALSETTING" WHERE 1 = 1`;
        let replacements = {};
    
        if (searchQueryValue) {
          stringQuery += ` AND "${searchByValue}" ILIKE :searchQueryValue`;
          replacements.searchQueryValue = `%${searchQueryValue}%`;
        }
    
        if (advancedFilters && Object.keys(advancedFilters).length > 0) {
          Object.keys(advancedFilters).forEach(key => {
            if (advancedFilters[key]) {
                if (key === 'IS_ACTIVE') {
                    replacements[key] = parseInt(advancedFilters[key], 10);
                } else {
                    replacements[key] = advancedFilters[key];
                }
              stringQuery += ` AND "${key}" = :${key}`;
            }
          });
        }

        const [results] = await db.query(stringQuery, {
            replacements,
        });
        res.status(200).json(results);
    }catch(e){
        console.log(e);
    }
}