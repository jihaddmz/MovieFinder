import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchSearchMoviesApi} from "../../api/api.ts";

const fetchSearchMovie = createAsyncThunk(
    "fetchSearchMovies",
    async (query: string = "", {rejectWithValue}) => {
        try {
            const result = await fetchSearchMoviesApi(query);
            return result;
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : "Error while fetching search movies.";
            return rejectWithValue(errorMsg)
        }
    }
)

export default fetchSearchMovie;