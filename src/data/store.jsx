import { configureStore, createSlice } from '@reduxjs/toolkit';
const tokenSlice = createSlice({
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
const tokenReducer = tokenSlice.reducer;
const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        clearUser: (state) => {
            return null;
        }
    },
});
const userReducer = userSlice.reducer;
const walletSlice = createSlice({
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
const walletReducer = walletSlice.reducer;
const StatementSlice = createSlice({
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
const statementReducer = StatementSlice.reducer;

const snackbarSlice = createSlice({
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
const snackbarReducer = snackbarSlice.reducer;
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

export const { setToken,clearToken } = tokenSlice.actions;
export const { setUser,clearUser } = userSlice.actions;
export const { setWallet , clearWallet, enableTOTP} = walletSlice.actions;
export const { setStatement , clearStatement} = StatementSlice.actions;
export const { showMessage, hideMessage } = snackbarSlice.actions;
export default store;
