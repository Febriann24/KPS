import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Users from "../models/MS_USER.js";
import MS_JOB from "../models/MS_JOB.js";
import PengajuanPinjaman from "../models/TR_PENGAJUAN_PINJAMAN.js";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['UUID_MS_USER', 'NAMA_LENGKAP', 'EMAIL', 'NOMOR_TELP', 'UUID_MS_JOB']
    });
        res.json(users);
    } catch (error) {    
        console.log(error);
        res.status(500).json({ message: "Failed to fetch users." });
    }    
}
export const UserData = async (req, res) => {
    try {
        const users = await Users.findAll({
            include: [{
                model: PengajuanPinjaman,
                attributes: ['NOMINAL_UANG'],
                required: false,
            }],
        });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};


export const Register = async (req, res) => {
    const { name, email, password, confPassword, noTelp, role } = req.body;

    // Memeriksa kesesuaian password    
    if (password !== confPassword) {    
        return res.status(400).json({ message: "Passwords do not match with confirm password!" });    
    }
    
    try {
        // Menentukan UUID_MS_JOB berdasarkan role yang dipilih
        const job = await MS_JOB.findOne({ where: { JOB_DESC: role } });
        if (!job) {
            return res.status(400).json({ message: "Role tidak ditemukan di database." });
        }
        
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        
        // Insert user baru dengan role yang benar
        await Users.create({
            NAMA_LENGKAP: name,
            EMAIL: email,
            PASSWORD: hashPassword,
            NOMOR_TELP: noTelp,
            ROLE: role,
            UUID_MS_JOB: job.UUID_MS_JOB // Menambahkan UUID_MS_JOB dari role yang dipilih
        });
        
        res.json({ msg: "Register Success" });
    } catch (error) {    
        console.log(error);
        res.status(500).json({ message: "Failed to register user." });
    }
}



export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: { EMAIL: req.body.email },
            attributes: ['UUID_MS_USER', 'NAMA_LENGKAP', 'EMAIL', 'PASSWORD', 'UUID_MS_JOB']
        });

        const match  = await bcrypt.compare(req.body.password, user[0].PASSWORD);
        if(!match) return res.status(400).json({ msg: "Wrong Password" });

        const userId = user[0].UUID_MS_USER;
        const name = user[0].NAMA_LENGKAP;
        const email = user[0].EMAIL;
        const role = user[0].UUID_MS_JOB;

        const accesstoken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })
        const refreshToken = jwt.sign({ userId, name, email, role  }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                UUID_MS_USER: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({ accesstoken, role });
    } catch (error) {
        res.status(404).json({ message: "Email not found" });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(204);
        
        const user = await Users.findAll({ 
            where: { 
                refresh_token: refreshToken 
            } 
        });
        if (!user[0]) return res.sendStatus(204);
        const userId = user[0].UUID_MS_USER;
        await Users.update({ refresh_token: null }, {
            where: {
                UUID_MS_USER: userId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
}