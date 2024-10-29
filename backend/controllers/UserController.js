import User from "../models/MS_USER.js";

export const getUsers = async(req, res) => {
    try{
        const response = await User.findAll();
        res.status(200).json(response);
    }
    catch(error) {
        console.log(error.message);
    }
}

export const getUserById = async(req, res) => {
    try{
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    }
    catch(error) {
        console.log(error.message);
    }
}

export const createUser = async(req, res) => {
    try{
        await User.create(req.body);
        res.status(201).json({msg: "User Created Successfully"});
    }
    catch(error) {
        console.log(error.message);
    }
}

export const updateUser = async(req, res) => {
    try{
        await User.update(req.body, {
            where:{
                id: req.params.id
            }
        });
        res.status(201).json({msg: "User Updated Successfully"});
    }
    catch(error) {
        console.log(error.message);
    }
}

export const deleteUser = async(req, res) => {
    try{
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(201).json({msg: "User Deleted Successfully"});
    }
    catch(error) {
        console.log(error.message);
    }
}

export const deleteAllUser = async(req, res) => {
    try{
        const response = await User.destroy({
            where:{}
        });
        res.status(200).json({msg: response + " Users Deleted Successfully"});
    }
    catch(error) {
        console.log(error.message);
    }
}