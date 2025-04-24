import {configureStore} from "@reduxjs/toolkit";
import likesSlice from "./slices/likesSlice.ts";
import moviesSlice from "./slices/moviesSlice.ts";

const store = configureStore({
    reducer: {
        likes: likesSlice,
        movies: moviesSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;