import Router from "express";
import {getAllUsers, signIn, signUp} from "../controllers/controllerUsers";
import {authMiddleWare} from "../middlewares/authMiddleWare";

const router = Router();

router.get("/", getAllUsers)
router.post("/signup", signUp)
router.post("/signin", signIn)

export default router;