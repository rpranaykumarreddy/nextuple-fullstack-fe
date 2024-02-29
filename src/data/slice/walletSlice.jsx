import {createSlice} from "@reduxjs/toolkit";

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: null,
    reducers: {
        setWallet: (state, action) => {
            return action.payload;
        },
        clearWallet: (state) => {
            return null;
        },
        enableTOTP: (state) => {
            return { ...state, totpEnabled: true };
        }
    },
});
export const walletReducer = walletSlice.reducer;