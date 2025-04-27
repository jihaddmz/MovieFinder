import {Movie, SignInData} from "../types/Movie.ts";
import {checkForApiError} from "../config/helpers.ts";

const token = localStorage.getItem("token");
const options = {
    baseURL: 'http://192.168.0.135:8080/api',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        accept: 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    }
}

export const fetchMoviesApi = async (query: string = ""): Promise<Movie[]> => {
    const endpoint = query ? "movies?query=" + query : "movies";
    const result = await fetch(`${options.baseURL}/${endpoint}`, {headers: options.headers});
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