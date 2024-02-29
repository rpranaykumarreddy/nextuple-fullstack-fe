import {createSlice} from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        message: '',
        isOpen: false,
        severity: 'success',
    },
    reducers: {
        showMessage: (state, action) => {
            state.isOpen = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        hideMessage: (state) => {
            state.isOpen = false;
            state.message = '';
            state.severity = 'success';
        },
    },
});
export const snackbarReducer = snackbarSlice.reducer;