import {createAsyncThunk} from "@reduxjs/toolkit";
import {signInUser} from "../../api/api.ts";

interface Props {
    email: string;
    password: string;
}

export const signInAction = createAsyncThunk(
    'signInAction',
    async ({email, password}: Props, {rejectWithValue}) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const result = await signInUser(email, password);
            return result;
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : "Error while signing in...";
            return rejectWithValue(errorMsg)
        }
    }
)