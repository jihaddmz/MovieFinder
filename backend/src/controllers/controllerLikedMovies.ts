import {NextFunction, Request, Response} from "express";
import db from "../config/db";
import CustomError from "../types/CustomError";
import {QueryResult} from "mysql2";

const getLikedMovie = async (movieId: number, userId: number) => {
    try {
        const [rows] = await db.query<Movie[] & QueryResult>("select m.* from movies m left join liked_movies lm on lm.movie_id=m.id where lm.user_id=? and lm.movie_id=?", [userId, movieId]);
        return rows[0]
    } catch (e) {
        throw e
    }
}

export const getAllLikedMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const [rows] = await db.query("SELECT m.* from movies m left join liked_movies lm on lm.movie_id=m.id where lm.user_id=?", [userId]);
        res.status(200).json(rows);
    } catch (e) {
        next(e);
    }
}

export const saveLikedMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId, movieId} = req.body;

        if (!userId || !movieId) {
            return next(new CustomError(400, "userId and movieId are required!"));
        }
        await db.query("insert into liked_movies (user_id, movie_id) values (?, ?)", [userId, movieId]);
        const savedMovie = await getLikedMovie(movieId, userId);
        res.status(200).json({success: true, movie: savedMovie});
    } catch (e) {
        next(new CustomError(500, "Failed to save liked movie"));
    }

}

export const deleteLikedMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId, movieId} = req.body;

        if (!userId || !movieId) {
            return next(new CustomError(400, "userId and movieId are required!"));
        }
        const deletedMovie = await getLikedMovie(movieId, userId);
        await db.query("delete from liked_movies where user_id=? and movie_id=?", [userId, movieId]);
        res.status(200).json({success: true, movie: deletedMovie});
    } catch (e) {
        next(new CustomError(500, "Failed to delete liked movie"));
    }
}