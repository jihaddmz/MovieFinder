import {createAsyncThunk} from "@reduxjs/toolkit";
import {deleteLikedMovieApi, saveLikedMovieApi} from "../../api/api.ts";

export enum LikedMovieActionType {
    Save, Delete
}

interface Props {
    userId: number;
    movieId: number;
    goal: LikedMovieActionType
}

const likedMovieAction = createAsyncThunk(
    "likedMovieAction",
    async ({userId, movieId, goal}: Props, {rejectWithValue}) => {
        try {
            let movie;
            if (goal === LikedMovieActionType.Save) { // the user has liked a movie
                movie = await saveLikedMovieApi(userId, movieId);
            } else { // the user has unliked a movie so delete
                movie = await deleteLikedMovieApi(userId, movieId);
            }
            return {
                movie,
                goal
            };
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : "Error while saving liked movie..";
            return rejectWithValue(errorMsg)
        }
    }
)

export default likedMovieAction;