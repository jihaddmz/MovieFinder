import {Router} from "express";
import {fetchMovies, saveMoviesToDB} from "../controllers/controllerMovies";

const router = Router();

// router.get("/", saveMoviesToDB);
router.get("/", fetchMovies);

export default router;