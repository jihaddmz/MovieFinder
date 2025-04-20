import Router from "express";
import {deleteLikedMovie, getAllLikedMovies, saveLikedMovie} from "../controllers/controllerLikedMovies";
const router = Router();

router.get("/:id", getAllLikedMovies)
router.post("/", saveLikedMovie)
router.delete("/", deleteLikedMovie)

export default router;