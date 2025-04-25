import {Router} from "express";
import {fetchMovies, saveMoviesToDB} from "../controllers/controllerMovies";
import {authMiddleWare} from "../middlewares/authMiddleWare";

const router = Router();

// router.get("/", saveMoviesToDB);
router.get("/", authMiddleWare, fetchMovies);

export default router;