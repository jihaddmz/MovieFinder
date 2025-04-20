import {Movie} from "../types/Movie.ts";

const options = {
    baseURL: 'http://192.168.0.135:3000/api',
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
    }
}

export const fetchMoviesApi = async (query: string = ""): Promise<Movie[]> => {
    const endpoint = query ? "movies?query=" + query : "movies";
    const result = await fetch(`${options.baseURL}/${endpoint}`, {headers: options.headers});
    return (await result.json()).results;
}

export const fetchFavoritesApi = async (id: number): Promise<Movie[]> => {
    const result = await fetch(`${options.baseURL}/liked-movies/${id}`, {headers: options.headers});
    return (await result.json());
}

export const saveLikedMovieApi = async (userId: number, movieId: number): Promise<Movie> => {
    const result = await fetch(`${options.baseURL}/liked-movies/`, {
        method: 'POST', headers: options.headers, body: JSON.stringify({
            userId: userId,
            movieId: movieId
        })
    });
    return (await result.json()).movie;
}

export const deleteLikedMovieApi = async (userId: number, movieId: number): Promise<Movie> => {
    const result = await fetch(`${options.baseURL}/liked-movies/`, {
        method: 'DELETE', headers: options.headers, body: JSON.stringify({
            userId: userId,
            movieId: movieId
        })
    });

    return (await result.json()).movie;
}