import {createSlice} from "@reduxjs/toolkit";
import {Movie} from "../../types/Movie.ts";
import fetchSearchMoviesAction from "../actions/fetchSearchMoviesAction.ts";
import fetchMoviesAction from "../actions/fetchMoviesAction.ts";

interface Props {
    movies: Movie[],
    searchedMovies: Movie[],
    page: number,
    featured: Movie | null,
    hasMoreMovies: boolean,
    loading: boolean,
    error: string | null,
}

const initialState: Props = {
    movies: [],
    searchedMovies: [],
    page: 0,
    hasMoreMovies: true,
    featured: null,
    loading: false,
    error: null,
}

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        incrementPage: (state) => {
            state.page += 1;
        },

        resetSearchedMovies: (state) => {
            state.searchedMovies = [];
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchMoviesAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchMoviesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchSearchMoviesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.searchedMovies = action.payload
            })

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
                state.hasMoreMovies = action.payload.content.length > 0
                state.movies.push(...action.payload.content);

                if (state.featured == null) {
                    state.featured = action.payload.content.find(movie => movie.title.toLowerCase() === "The Shawshank redemption".toLowerCase())!
                }
            })

    }
})

export const { incrementPage, resetSearchedMovies } = moviesSlice.actions;
export default moviesSlice.reducer;