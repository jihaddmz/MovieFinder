type Movie = {
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

type User = {
    id: number;
    name: string;
    email: string;
}

type LikedMovie = {
    user_id: number;
    movie_id: number;
}