import Router from "express";
import {getAllUsers, saveUser} from "../controllers/controllerUsers";

const router = Router();

router.get("/", getAllUsers)
router.post("/", saveUser)

export default router;