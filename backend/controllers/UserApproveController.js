import MS_USER_APPROVE from "../models/MS_USER_APPROVE.js";
import MS_USER from "../models/MS_USER.js";
import MS_JOB from "../models/MS_JOB.js";

// Get all pending user approvals
export const getPendingApprovals = async (req, res) => {
    try {
        const approvals = await MS_USER_APPROVE.findAll({
            where: { IS_APPROVE: 0 }, 
            include: [MS_JOB] 
        });
        res.status(200).json(approvals);
    } catch (error) {
        res.status(500).json({ message: "Error fetching approvals", error });
    }
};

// Approve a user and insert into MS_USER
export const approveUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userApproval = await MS_USER_APPROVE.findByPk(id);
        if (!userApproval) {
            return res.status(404).json({ message: "User approval not found" });
        }

        // Insert approved user into MS_USER
        const newUser = await MS_USER.create({
            NOMOR_TELP: userApproval.NOMOR_TELP,
            EMAIL: userApproval.EMAIL,
            PASSWORD: userApproval.PASSWORD,
            NAMA_LENGKAP: userApproval.NAMA_LENGKAP,
            TANGGAL_LAHIR: userApproval.TANGGAL_LAHIR,
            ALAMAT: userApproval.ALAMAT,
            UUID_MS_JOB: userApproval.UUID_MS_JOB,
            IS_ACTIVE: 1
        });

        // Update the approval status in MS_USER_APPROVE
        await userApproval.update({ IS_APPROVE: 1 });

        res.status(200).json({
            message: "User approved and added to MS_USER successfully",
            newUser
        });
    } catch (error) {
        res.status(500).json({ message: "Error approving user", error });
    }
};

// Reject a user by deleting the approval request
export const rejectUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userApproval = await MS_USER_APPROVE.findByPk(id);
        if (!userApproval) {
            return res.status(404).json({ message: "User approval not found" });
        }
        await userApproval.destroy();  // Delete the record if rejected
        res.status(200).json({ message: "User rejected and request deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error rejecting user", error });
    }
};

// Create a new user approval request (if needed)
export const createUserApproval = async (req, res) => {
    const { NOMOR_TELP, EMAIL, PASSWORD, NAMA_LENGKAP, TANGGAL_LAHIR, ALAMAT, UUID_MS_JOB } = req.body;
    try {
        const newUserApproval = await MS_USER_APPROVE.create({
            NOMOR_TELP,
            EMAIL,
            PASSWORD,
            NAMA_LENGKAP,
            TANGGAL_LAHIR,
            ALAMAT,
            UUID_MS_JOB,
            IS_APPROVE: null
        });
        res.status(201).json(newUserApproval);
    } catch (error) {
        res.status(500).json({ message: "Error creating user approval request", error });
    }
};
