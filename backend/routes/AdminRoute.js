import e from "express";
import {
    getAllGenset, 
    getGensetFiltered, 
    updateGenset, 
    getAllUsers, 
    getUsersFiltered
} from "../controllers/AdminController.js";
const router = e.Router();

router.get("/getAllGenset", getAllGenset);
router.post("/getGensetFiltered", getGensetFiltered);
router.put("/updateGenset/:id", updateGenset);
router.get("/getallusers", getAllUsers);
router.post("/getuserfiltered", getUsersFiltered);

export default router;

