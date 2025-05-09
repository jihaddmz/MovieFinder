import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchMoviesApi} from "../../api/api.ts";

const fetchMovies = createAsyncThunk(
    "fetchMovies",
    async (page: number = 0, {rejectWithValue}) => {
        try {
            const result = await fetchMoviesApi(page);
            console.log(`total page is ${result.page.totalPages}`)
            return result;
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : "Error while fetching movies.";
            return rejectWithValue(errorMsg)
        }
    }
)

export default fetchMovies;