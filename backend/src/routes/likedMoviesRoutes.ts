import Router from "express";
import {deleteLikedMovie, getAllLikedMovies, saveLikedMovie} from "../controllers/controllerLikedMovies";
import {authMiddleWare} from "../middlewares/authMiddleWare";
const router = Router();

router.get("/:id", authMiddleWare, getAllLikedMovies)
router.post("/", authMiddleWare, saveLikedMovie)
router.delete("/", authMiddleWare, deleteLikedMovie)

export default router;