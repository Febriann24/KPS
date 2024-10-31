import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import MS_USER from "../models/MS_USER.js";


export const getUsers = async (req, res) => {
    try{ 
        const users = await MS_USER.findAll({
            attributes:['UUID_MS_USER', 'EMAIL']
        });
        res.json(users);    
       } 
    catch (error) {
    console.log(error);
    }
}
export const registerUser = async (req, res) => {
    const { EMAIL, PASSWORD, NOMOR_TELP, NAMA_LENGKAP, ROLE } = req.body;

    if (!EMAIL || !PASSWORD || !NOMOR_TELP || !NAMA_LENGKAP || !ROLE) {
        return res.status(400).json({ message: "Semua field harus diisi." });
    }
    

    
    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(PASSWORD, salt);
        await MS_USER.create({
            EMAIL,
            PASSWORD: hashPassword,
            NOMOR_TELP,
            NAMA_LENGKAP,
            ROLE,
        });
        res.status(201).json({ message: 'User registered', MS_USER });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Fungsi untuk login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password harus diisi.' });
    }

    try {
        // Cari pengguna berdasarkan email
        const user = await MS_USER.findOne({ 
            where: { EMAIL: email } 
        });
        // console.log(user); // Cek data pengguna yang ditemukan

        if (!user) return res.status(404).json({ message: 'Email tidak terdaftar' });

        // Periksa apakah password cocok
        const isMatch = await bcrypt.compare(password, user.PASSWORD);
        // console.log(isMatch); // Cek hasil perbandingan password

        if (!isMatch) return res.status(401).json({ message: 'Password salah' });

        // Buat token JWT
        const accesToken = jwt.sign({ id: user.UUID_MS_USER, }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        const refreshToken = jwt.sign({ id: user.UUID_MS_USER }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        await MS_USER.update({ refresh_token: refreshToken }, { 
            where: { UUID_MS_USER: user.UUID_MS_USER } 
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accesToken });

    } catch (error) {
        // console.error(error); // Log kesalahan untuk debugging
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};


export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);// status no konten (204)

    const user = await MS_USER.findAll({ 
        where: { 
            refresh_token: refreshToken
        } 
    });
    if (!user) return res.sendStatus(204);
    const userId = user[0].UUID_MS_USER;

    await MS_USER.update({ refresh_token: null }, { 
        where: { 
            UUID_MS_USER: userId 
        } 
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}