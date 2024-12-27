import e from "express";
import {
    getAllGenset, 
    getGensetFiltered, 
    updateGenset, 
    getAllUsers, 
    getUsersFiltered,
    getDistinctJobCode
} from "../controllers/AdminController.js";
const router = e.Router();

{/* GENSET */}
router.get("/getAllGenset", getAllGenset);
router.post("/getGensetFiltered", getGensetFiltered);
router.put("/updateGenset/:id", updateGenset);
{/*L IST USER */}
router.get("/getdistinctjobcode", getDistinctJobCode);
router.get("/getallusers", getAllUsers);
router.post("/getuserfiltered", getUsersFiltered);

export default router;

