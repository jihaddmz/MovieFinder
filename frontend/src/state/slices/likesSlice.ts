import {createSlice} from "@reduxjs/toolkit";
import {Movie} from "../../types/Movie.ts";
import fetchFavoritesAction from "../actions/fetchFavoritesAction.ts";
import likedMovieAction, {LikedMovieActionType} from "../actions/likedMovieAction.ts";

interface Props {
    likedMovies: Movie[],
    loading: boolean,
    error: string | null,
}

const initialState: Props = {
    likedMovies: [],
    loading: false,
    error: null,
}

const likesSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {
        addMovie: (state, action) => {
            state.likedMovies.push(action.payload);
        },

        removeMovie: (state, action) => {
            state.likedMovies.splice(action.payload, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFavoritesAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchFavoritesAction.rejected, (state, action) => {
                state.likedMovies = [];
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.likedMovies = action.payload;
            })


            .addCase(likedMovieAction.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(likedMovieAction.fulfilled, (state, action) => {
                const {movie, goal} = action.payload;
                if (goal === LikedMovieActionType.Save) {
                    state.likedMovies.push(movie)
                } else {
                    const index = state.likedMovies.findIndex((i) => i.id === movie.id)
                    state.likedMovies.splice(index, 1)
                }
            })
    }
})
export const {addMovie, removeMovie} = likesSlice.actions;
export default likesSlice.reducer;