import db from "../config/database.js";
import MsGeneralSetting from "../models/MS_GENERALSETTING.js";
import MS_USER from "../models/MS_USER.js";
import MS_JOB from "../models/MS_JOB.js";

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