import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchFavoritesApi} from "../../api/api.ts";

const fetchFavoritesAction = createAsyncThunk(
    "FETCH_FAVORITES",
    async (id: number, {rejectWithValue}) => {
        try {
            const result = await fetchFavoritesApi(id);
            return result;
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : "Error while fetching favorites.";
            return rejectWithValue(errorMsg)
        }
    }
)

export default fetchFavoritesAction;