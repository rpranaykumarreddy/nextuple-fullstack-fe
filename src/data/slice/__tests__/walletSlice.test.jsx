import {walletReducer } from '../walletSlice';
import {wallet, walletNoTOTP} from "../../../Utils/testData";

describe('walletSlice reducer', () => {
    test('should handle setWallet', () => {
        const initialState = null;
        const walletData = wallet;
        const action = {
            type: 'wallet/setWallet',
            payload: walletData,
        };
        const state = walletReducer(initialState, action);
        expect(state).toEqual(walletData);
    });

    test('should handle clearWallet', () => {
        const initialState = wallet;
        const action = {
            type: 'wallet/clearWallet',
        };
        const state = walletReducer(initialState, action);
        expect(state).toEqual(null);
    });

    test('should handle enableTOTP', () => {
        const initialState = walletNoTOTP;
        const action = {
            type: 'wallet/enableTOTP',
        };
        const state = walletReducer(initialState, action);
        expect(state.totpEnabled).toEqual(true);
    });


    test('should handle disableTOTP', () => {
        const initialState = wallet;
        const action = {
            type: 'wallet/disableTOTP',
        };
        const state = walletReducer(initialState, action);
        expect(state.totpEnabled).toEqual(false);
    });

    test('should return the initial state', () => {
        expect(walletReducer(undefined, {})).toEqual(null);
    });
});
