import {createSlice} from "@reduxjs/toolkit";
import {Movie} from "../../types/Movie.ts";
import fetchMoviesAction from "../actions/fetchMoviesAction.ts";

interface Props {
    movies: Movie[],
    featured: Movie | null,
    loading: boolean,
    error: string | null,
}

const initialState: Props = {
    movies: [],
    featured: null,
    loading: false,
    error: null,
}

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoviesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchMoviesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.movies = action.payload
                if (state.featured == null) {
                    state.featured = action.payload.find(movie => movie.title.toLowerCase() === "The Shawshank redemption".toLowerCase())!
                }
            })
    }
})

export default moviesSlice.reducer;