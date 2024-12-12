import e from "express";
import {getAllGenset} from "../controllers/AdminController.js";
const router = e.Router();

router.get("/getAllGenset", getAllGenset);

export default router;

