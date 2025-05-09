import {Movie, MoviesPageResponse, SignInData} from "../types/Movie.ts";
import {checkForApiError} from "../config/helpers.ts";

const token = localStorage.getItem("token");
const options = {
    baseURL: 'https://movie-finder-7aoa.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    }
}

export const fetchMoviesApi = async (page: number): Promise<MoviesPageResponse> => {
    console.log(`Entered in api ${page}`)
    const result = await fetch(`${options.baseURL}/movies?page=${page}`, {headers: options.headers});
    await checkForApiError(result)

    return (await result.json());
}

export const fetchSearchMoviesApi = async (query: string): Promise<Movie[]> => {
    const result = await fetch(`${options.baseURL}/movies/search?query=${query}`, {headers: options.headers});
    await checkForApiError(result)
    return (await result.json()).results;
}

export const fetchFavoritesApi = async (id: number): Promise<Movie[]> => {
    const result = await fetch(`${options.baseURL}/liked-movies/${id}`, {headers: options.headers})
    await checkForApiError(result)
    return (await result.json());
}

export const saveLikedMovieApi = async (userId: number, movieId: number): Promise<Movie> => {
    const result = await fetch(`${options.baseURL}/liked-movies/`, {
        method: 'POST', headers: options.headers, body: JSON.stringify({
            userId: userId,
            movieId: movieId
        })
    });
    await checkForApiError(result)
    return (await result.json()).movie;
}

export const deleteLikedMovieApi = async (userId: number, movieId: number): Promise<Movie> => {
    const result = await fetch(`${options.baseURL}/liked-movies/`, {
        method: 'DELETE', headers: options.headers, body: JSON.stringify({
            userId: userId,
            movieId: movieId
        })
    });
    await checkForApiError(result)
    return (await result.json()).movie;
}

export const signUpUser = async (name: string, email: string, password: string) => {
    const result = await fetch(`${options.baseURL}/users/signup`, {
        method: "POST",
        headers: options.headers,
        body: JSON.stringify({name: name, email: email, password: password})
    });

    await checkForApiError(result)

    return (await result.json());
}

export const signInUser = async (email: string, password: string) => {
    const result = await fetch(`${options.baseURL}/users/signin`, {
        method: "POST",
        headers: options.headers,
        body: JSON.stringify({email: email, password: password})
    });

    await checkForApiError(result)

    return (await result.json()) as SignInData;
}