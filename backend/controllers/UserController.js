import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Users from "../models/MS_USER.js";
import MS_JOB from "../models/MS_JOB.js";
import PengajuanPinjaman from "../models/TR_PENGAJUAN_PINJAMAN.js";
import PengajuanSimpanan from "../models/TR_PENGAJUAN_SIMPANAN.js";
import StatusPinjaman from "../models/MS_STATUS_PINJAMAN.js";
import StatusSimpanan from "../models/MS_STATUS_SIMPANAN.js";
import TypePinjaman from "../models/MS_TYPE_PINJAMAN.js";
import TypeSimpanan from "../models/MS_TYPE_SIMPANAN.js";
import HistoryPinjaman from "../models/TR_HISTORY_DATA_PINJAMAN.js";
import HistorySimpanan from "../models/TR_HISTORY_DATA_SIMPANAN.js";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['UUID_MS_USER', 'NAMA_LENGKAP', 'EMAIL', 'NOMOR_TELP', 'UUID_MS_JOB', 'ALAMAT', 'TANGGAL_LAHIR']
    });
        res.json(users);
    } catch (error) {    
        console.log(error);
        res.status(500).json({ message: "Failed to fetch users." });
    }    
}

export const UserApproval = async (req, res) => {
    try {
        const users = await Users.findAll({
            where: {
                IS_ACTIVE: 0
            }
        });

        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: "No users pending approval" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error: error.message });
    }
};


export const UserData = async (req, res) => {
    try {
        const users = await Users.findAll({
            where: {
                IS_ACTIVE: 1
            },
            include: [
                {
                  model: PengajuanPinjaman,
                  attributes: ['NOMINAL', 'createdAt'],
                  required: false,
                  include: [
                    {
                        model: StatusPinjaman,
                        as: 'status',
                        attributes: ['STATUS_CODE'],
                        required: false
                      },
                      {
                        model: TypePinjaman,
                        as: 'type',
                        attributes: ['INTEREST_RATE', 'TENOR'],
                        required: false
                      }
                  ]
                },
                {
                  model: PengajuanSimpanan,
                  attributes: ['NOMINAL', 'createdAt'],
                  required: false,
                  include: [
                    {
                        model: StatusSimpanan,
                        as: 'status',
                        attributes: ['STATUS_CODE'],
                        required: false
                    },
                    {
                        model: TypeSimpanan,
                        as: 'type',
                        attributes: ['INTEREST_RATE', 'TYPE_NAME'],
                        required: false
                    }
                  ]
                }
              ],
            });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};
export const UserDataById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Users.findOne({
        where: {
          UUID_MS_USER: id,
          IS_ACTIVE: 1
        },
        include: [
          {
            model: PengajuanPinjaman,
            attributes: ['NOMINAL', 'updatedAt', 'createdAt'],
            required: false,
            include: [
              {
                model: StatusPinjaman,
                as: 'status',
                attributes: ['STATUS_CODE'],
                required: false
              },
              {
                model: TypePinjaman,
                as: 'type',
                attributes: ['INTEREST_RATE', 'TENOR'],
                required: false
              },
              {
                model: HistoryPinjaman,
                as: "historyPinjaman",
                attributes: ["ANGSURAN_BERBUNGA", "ANGSURAN_BERSIH"],
                required: false
              }
            ]
          },
          
          {
            model: PengajuanSimpanan,
            attributes: ['NOMINAL', 'updatedAt', 'createdAt'],
            required: false,
            include: [
                {
                    model: StatusSimpanan,
                    as: 'status',
                    attributes: ['STATUS_CODE'],
                    required: false
                },
                {
                    model: TypeSimpanan,
                    as: 'type',
                    attributes: ['INTEREST_RATE', 'TYPE_NAME'],
                    required: false
                },
                {
                  model: HistorySimpanan,
                  as: "historySimpanan",
                  attributes: ["SIMPANAN_BERBUNGA", "AMOUNT_SIMPANAN"],
                  required: false
                }
            ]
          }
        ],
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user", error: error.message });
    }
  };  
  

export const Register = async (req, res) => {
    const { name, email, password, confPassword, noTelp, role, alamat, tanggalLahir, unitKerja, noAnggota  } = req.body;
 
    if (password !== confPassword) {    
        return res.status(400).json({ message: "Passwords do not match with confirm password!" });    
    }
    
    try {

        const job = await MS_JOB.findOne({ where: { JOB_CODE: role } });
        if (!job) {
            return res.status(400).json({ message: "Role tidak ditemukan di database." });
        }
        
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        
        await Users.create({
            NAMA_LENGKAP: name,
            EMAIL: email,
            PASSWORD: hashPassword,
            NOMOR_TELP: noTelp,
            ALAMAT: alamat,
            TANGGAL_LAHIR: tanggalLahir,
            UNIT_KERJA: unitKerja,
            NOMOR_ANGGOTA: noAnggota,
            UUID_MS_JOB: job.UUID_MS_JOB
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
            attributes: ['UUID_MS_USER', 'NAMA_LENGKAP', 'EMAIL', 'PASSWORD', 'UUID_MS_JOB', 'NOMOR_TELP', 'ALAMAT', 'TANGGAL_LAHIR']
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

export const approveUser = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Users.update(
            { IS_ACTIVE: 1 },
            { where: { UUID_MS_USER: id } }
        );

        if (result[0] === 0) {
            return res.status(404).json({ message: "User not found or already approved" });
        }

        res.status(200).json({ message: "User approved successfully" });
    } catch (error) {
        console.error("Error approving user:", error);
        res.status(500).json({ message: "Error approving user", error });
    }
};

export const rejectUser = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Users.update(
            { IS_ACTIVE: 0, IS_DELETED: 1 },
            { where: { UUID_MS_USER: id } }
        );

        if (result[0] === 0) {
            return res.status(404).json({ message: "User not found or already rejected" });
        }

        res.status(200).json({ message: "User rejected successfully" });
    } catch (error) {
        console.error("Error rejecting user:", error);
        res.status(500).json({ message: "Error rejecting user", error });
    }
};

export const getOneUser = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Users.findOne({
            where: {
                UUID_MS_USER: id
            },
            include: [
                {
                    model: MS_JOB,
                    as: 'MS_JOB',
                    attributes: ['UUID_MS_JOB', 'JOB_CODE']
                },
            ],
            attributes: [
                "UUID_MS_USER",
                "IS_ACTIVE",
                "NAMA_LENGKAP",
                "NOMOR_TELP",
                "EMAIL",
                "TANGGAL_LAHIR",
                "UNIT_KERJA",
                "NOMOR_ANGGOTA",
                "ALAMAT",
                "createdAt"
            ]
        });
        res.status(200).json(data)
    } catch (error) {
        console.error("Error finding user:", error);
        res.status(500).json({ message: "Error finding user", error });
    }
}