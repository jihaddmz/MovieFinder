import {createAsyncThunk} from "@reduxjs/toolkit";
import {signUpUser} from "../../api/api.ts";

interface Props {
    name: string;
    email: string;
    password: string;
}

export const signUpAction = createAsyncThunk(
    'signUpAction',
    async ({name, email, password}: Props, {rejectWithValue}) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const result = await signUpUser(name, email, password);
            return result;
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : "Error while signing up...";
            return rejectWithValue(errorMsg)
        }
    }
)