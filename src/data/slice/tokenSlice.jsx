import { createSlice } from '@reduxjs/toolkit';
export const tokenSlice = createSlice({
    name: 'token',
    initialState: null,
    reducers: {
        setToken: (state, action) => {
            return action.payload;
        },
        clearToken: (state) => {
            return null;
        }
    },
});
export const tokenReducer = tokenSlice.reducer;