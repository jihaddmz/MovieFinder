import {createSlice} from "@reduxjs/toolkit";
import {signUpAction} from "../actions/signUpAction.ts";
import {signInAction} from "../actions/signInAction.ts";
import {SignInData} from "../../types/Movie.ts";

type Props = {
    signInData: SignInData | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: Props = {
    signInData: null,
    loading: false,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signUpAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
            .addCase(signUpAction.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload as string;
            })
            .addCase(signUpAction.fulfilled, (state) => {
                state.loading = false
                state.error = null;
                state.success = true;
            })

        // for the sign in action
        builder.addCase(signInAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
            .addCase(signInAction.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload as string;
            })
            .addCase(signInAction.fulfilled, (state, action) => {
                state.loading = false
                state.error = null;
                state.success = true;
                state.signInData = action.payload
            })
    }
})

export default authSlice.reducer;