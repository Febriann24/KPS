import db from "../config/database.js";
import MsGeneralSetting from "../models/MS_GENERALSETTING.js";
import MS_USER from "../models/MS_USER.js";
import MS_JOB from "../models/MS_JOB.js";
import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";

{/* MENU GENSET */}
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

{/* MENU LIST USER */}

export const getDistinctJobCode = async (req,res) => {
    try{
        const result = await MS_JOB.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('JOB_CODE')), 'JOB_CODE']
            ],
            where: {
                IS_ACTIVE: 1
            }
        })
        res.status(200).json(result);
    }catch(e){
        console.log(e);
    }
}

export const getAllUsers = async (req,res) => {
    try{
        const { limit, offset  } = req.query;

        const response = await MS_USER.findAndCountAll({
            limit: parseInt(limit,10),
            offset: parseInt(offset,10),
            include: [
                {
                    model: MS_JOB, 
                    as: 'msJob',  
                },
              ],
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

export const getOneUser = async(req,res) => {
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

export const updateUser = async (req,res) => {
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


const transformFilteredUserData = (data) => {
    return data.map(row => {
      const { "msJob.JOB_CODE": jobCode, "msJob.UUID_MS_JOB": uuidJob, ...user } = row;
  
      return {
        ...user,
        msJob: {
          JOB_CODE: jobCode,
          UUID_MS_JOB: uuidJob
        }
      };
    });
};

export const getUsersFiltered = async (req,res) => {
    const { searchByValue, searchQueryValue, advancedFilters, limit, offset } = req.body;

    try{
        let stringQuery = 
            `SELECT 
                amu.*,
                mj."UUID_MS_JOB" as "msJob.UUID_MS_JOB",
                mj."JOB_CODE" as "msJob.JOB_CODE" 
            FROM "MS_USER" amu 
            JOIN "MS_JOB" mj ON amu."UUID_MS_JOB" = mj."UUID_MS_JOB"
            WHERE 1 = 1`;
        let replacements = {};
    
        if (searchQueryValue) {
          stringQuery += ` AND "${searchByValue}" ILIKE :searchQueryValue`;
          replacements.searchQueryValue = `%${searchQueryValue}%`;
        }
    
        if (advancedFilters && Object.keys(advancedFilters).length > 0) {
          Object.keys(advancedFilters).forEach(key => {
            if (advancedFilters[key]) {  
                if(key === 'TGL_LAHIR'){
                    let startTglLahir = advancedFilters[key]?.startTglLahir;
                    let endTglLahir = advancedFilters[key]?.endTglLahir;

                    if (startTglLahir) {
                        startTglLahir = new Date(startTglLahir);
                        startTglLahir.setHours(0, 0, 0, 0);
                        replacements['startTglLahir'] = startTglLahir;
                        stringQuery += ` AND "TANGGAL_LAHIR" >= :startTglLahir`;
                    }
                
                    if (endTglLahir) {
                        endTglLahir = new Date(endTglLahir);
                        endTglLahir.setHours(23, 59, 59, 999);
                        replacements['endTglLahir'] = endTglLahir;
                        stringQuery += ` AND "TANGGAL_LAHIR" <= :endTglLahir`;
                    }
                }else if(key === 'createdAt'){
                    let startTglRegis = advancedFilters[key]?.startTglRegis;
                    let endTglRegis = advancedFilters[key]?.endTglRegis;
                    
                    if (startTglRegis) {
                        startTglRegis = new Date(startTglRegis);
                        startTglRegis.setHours(0,0,0,0);
                        replacements['startTglRegis'] = startTglRegis;
                        stringQuery += ` AND amu."createdAt" >= :startTglRegis`;
                    }
            
                    if (endTglRegis) {
                        endTglRegis = new Date(endTglRegis);
                        endTglRegis.setHours(23,59,59,999);
                        replacements['endTglRegis'] = endTglRegis;
                        stringQuery += ` AND amu."createdAt" <= :endTglRegis`;
                    }
                }else{
                    if (key === 'IS_ACTIVE') {
                        replacements[key] = parseInt(advancedFilters[key], 10);
                        stringQuery += ` AND amu."${key}" = :${key}`;
                    } else {
                        replacements[key] = advancedFilters[key];
                        stringQuery += ` AND "${key}" = :${key}`;
                    }
                }
            }
          });
        }

        stringQuery += ` LIMIT :limit OFFSET :offset`;
        replacements.limit = parseInt(limit);
        replacements.offset = offset;
        console.log("ini query", stringQuery);
        console.log("Replacements:", replacements);
        const [results] = await db.query(stringQuery, {
            replacements,
        });

        const processedResult = transformFilteredUserData(results);
        console.log("processedResult:", processedResult);
        let stringQueryCount = 
            `SELECT COUNT(*) 
            FROM "MS_USER" amu
            JOIN "MS_JOB" mj ON amu."UUID_MS_JOB" = mj."UUID_MS_JOB"`
        const [countResult] = await db.query(stringQueryCount, { replacements });
        const totalCount = countResult[0].count;

        res.status(200).json({            
            body: processedResult,
            totalCount: countResult,
            totalPages: Math.ceil(totalCount / limit),})
    }catch(e){
        console.log(e);
    }
}

const encryptString = async (string) => {
    try {
        const salt = await bcrypt.genSalt(); 
        const hashPassword = await bcrypt.hash(string, salt);  
        return hashPassword;  
    } catch (error) {
        console.error("Error encrypting string:", error);
        throw new Error("Failed to encrypt string.");
    }
}