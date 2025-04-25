import {RowDataPacket} from "mysql2";

export type Movie = {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

 export interface User extends RowDataPacket {
    id: number;
    name: string;
    email: string;
    password: string;
}

type LikedMovie = {
    user_id: number;
    movie_id: number;
}