export const CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.PUBLIC_TMDB_API!.toString(),
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.PUBLIC_TMDB_API!}`
    }
};