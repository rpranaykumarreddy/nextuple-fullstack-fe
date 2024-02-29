import {createSlice} from "@reduxjs/toolkit";

export const StatementSlice = createSlice({
    name: 'statement',
    initialState: null,
    reducers: {
        setStatement: (state, action) => {
            return action.payload;
        },
        clearStatement: (state) => {
            return null;
        }
    },
});
export const statementReducer = StatementSlice.reducer;