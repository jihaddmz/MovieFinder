import {CONFIG} from "../config/constants";

export const fetchMoviesApi = async (page: number = 1): Promise<Movie[]> => {
    const response = await fetch(
        `${CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`,
        {headers: CONFIG.headers}
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch movies from api ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
}