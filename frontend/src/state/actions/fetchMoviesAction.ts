import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchMoviesApi} from "../../api/api.ts";

const fetchMovie = createAsyncThunk(
    "fetchMovies",
    async (query: string = "", {rejectWithValue}) => {
        try {
            const result = await fetchMoviesApi(query);
            return result;
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : "Error while fetching favorites.";
            return rejectWithValue(errorMsg)
        }
    }
)

export default fetchMovie;