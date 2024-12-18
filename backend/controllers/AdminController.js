import db from "../config/database.js"
import MsGeneralSetting from "../models/MS_GENERALSETTING.js";
import MS_USER from "../models/MS_USER.js"
import Sequelize from "sequelize";
import { Op } from "sequelize";

export const getAllGenset = async (req,res) => {
    try{
        const { limit, offset  } = req.query;

        const response = await MsGeneralSetting.findAndCountAll({
            limit: parseInt(limit,10),
            offset: parseInt(offset,10),
        });

        res.status(200).json({
            body: response.rows,
            totalCount: response.count,
            totalPages: Math.ceil(response.count / limit),
        });
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
    const { searchByValue, searchQueryValue, advancedFilters, limit, offset } = req.body;

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

        stringQuery += ` LIMIT :limit OFFSET :offset`;
        replacements.limit = parseInt(limit);
        replacements.offset = offset;

        const [results] = await db.query(stringQuery, {
            replacements,
        });

        let stringQueryCount = `SELECT COUNT(*) FROM "MS_GENERALSETTING" WHERE 1 = 1`;
        const [countResult] = await db.query(stringQueryCount, { replacements });
        const totalCount = countResult[0].count;

        res.status(200).json({            
            body: results,
            totalCount: countResult,
            totalPages: Math.ceil(totalCount / limit),})
    }catch(e){
        console.log(e);
    }
}