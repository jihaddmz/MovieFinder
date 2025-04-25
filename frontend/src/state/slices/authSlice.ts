import {createSlice} from "@reduxjs/toolkit";

type Props = {
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: Props = {
    loading: false,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export default authSlice.reducer;