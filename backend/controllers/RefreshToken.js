import MS_USER from "../models/MS_USER.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401);
        
        const user = await MS_USER.findAll({ where: { refresh_token: refreshToken } });
        if (!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const accesToken = jwt.sign({ id: user.UUID_MS_USER }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
            res.json({ accesToken });
        });
    } catch (error) {    
        console.log(error);
    }
}