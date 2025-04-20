// noinspection SqlNoDataSourceInspection

import db from '../config/db'
import {fetchMoviesApi} from "../api/api";
import {NextFunction, Request, Response} from "express";
import {RowDataPacket} from "mysql2";

export const saveMoviesToDB = async (req: Request, res: Response, next: NextFunction) => {

    const saveMovie = async (movie: Movie) => {
        await db.query(
            `INSERT INTO movies (id, poster_path, adult, overview, release_date, genre_ids,
                                 original_title, original_language, title, backdrop_path,
                                 popularity, vote_count, video, vote_average)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                movie.id,
                movie.poster_path,
                movie.adult,
                movie.overview,
                movie.release_date,
                JSON.stringify(movie.genre_ids),
                movie.original_title,
                movie.original_language,
                movie.title,
                movie.backdrop_path,
                movie.popularity,
                movie.vote_count,
                movie.video,
                movie.vote_average,
            ]
        )
    }

    try {
        let page = 1
        while (page < 11) {
            const movies: Movie[] = await fetchMoviesApi(page);
            movies.map(async (movie) => {
                await saveMovie(movie);
            })
            page += 1;
        }

        res.status(200).json("Successfully added movies");
    } catch (e) {
        next(e);
        console.log("Error on fetchMovies", e);
    }
}

export const fetchMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query =  req.query.query
        const [rows] = await db.query<Movie[] & RowDataPacket[]>(`select * from movies ${query ? "where title like ?" : ""}`, [`%${query}%`]);
        res.status(200).json({
            "length": rows.length,
            "results": rows,
        });
    } catch (e) {
        next(e);
    }
}