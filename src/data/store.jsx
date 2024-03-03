import { configureStore, createSlice } from '@reduxjs/toolkit';
import {tokenSlice, tokenReducer} from './slice/tokenSlice';
import {userSlice, userReducer} from './slice/userSlice';
import {walletSlice, walletReducer} from './slice/walletSlice';
import {StatementSlice, statementReducer} from './slice/statementSlice';
import {snackbarSlice, snackbarReducer} from './slice/snackbarSlice';
import { useSelector } from 'react-redux';


const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Error loading state from local storage:', error);
        return undefined;
    }
};

const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('reduxState', JSON.stringify({ token: state.token }));
    return result;
};

const store = configureStore({
    reducer: {
        token: tokenReducer,
        user: userReducer,
        wallet: walletReducer,
        statement: statementReducer,
        snackbar: snackbarReducer,
    },
    preloadedState: loadStateFromLocalStorage(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});

//useSelector Helpers:
export const getToken= (state)=> state.token;
export const getUser= (state) => state.user;
export const getSnackbar = (state) => state.snackbar;

export const { setToken, clearToken } = tokenSlice.actions;
export const { setUser,clearUser } = userSlice.actions;
export const { setWallet , clearWallet, enableTOTP} = walletSlice.actions;
export const { setStatement , clearStatement} = StatementSlice.actions;
export const { showMessage, hideMessage } = snackbarSlice.actions;
export default store;
