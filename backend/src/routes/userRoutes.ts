import Router from "express";
import {getAllUsers, signIn, signUp} from "../controllers/controllerUsers";

const router = Router();

router.get("/", getAllUsers)
router.post("/signup", signUp)
router.post("/signin", signIn)

export default router;