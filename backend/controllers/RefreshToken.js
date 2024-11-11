import Users from "../models/MS_USER.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401);

        const user = await Users.findAll({ 
            where: { 
                refresh_token: refreshToken 
            } 
        });
        if (!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const userId = user[0].UUID_MS_USER;
            const name = user[0].NAMA_LENGKAP;
            const email = user[0].EMAIL;
            const role = user[0].UUID_MS_JOB;
            const accessToken = jwt.sign({ userId, name, email, role }, process.env.ACCESS_TOKEN_SECRET, { 
                expiresIn: '15s' 
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}