import e from "express";
import {getAllGenset, getGensetFiltered, updateGenset} from "../controllers/AdminController.js";
const router = e.Router();

router.get("/getAllGenset", getAllGenset);
router.post("/getGensetFiltered", getGensetFiltered);
router.put("/updateGenset/:id", updateGenset);

export default router;

