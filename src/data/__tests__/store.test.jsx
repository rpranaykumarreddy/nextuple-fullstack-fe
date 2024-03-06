import store, {getToken, getUser, getSnackbar, getWallet, setToken} from '../store';
import {statementData, token, user, wallet} from "../../Utils/testData";

describe('Redux Store and Slices', () => {

    test('should initialize the Redux store correctly', () => {
        expect(store).toBeDefined();
    });

    test('should store and retrieve data from localStorage', () => {
        store.dispatch(setToken('testToken'));
        expect(localStorage.getItem('reduxState')).toContain('testToken');
    });

    test('should provide correct selectors', () => {
        const state = {
            token: token,
            user: user,
            snackbar: { message: 'Test Message', isOpen: true, severity: 'info' },
            wallet: wallet,
            statement: statementData,
        };

        expect(getToken(state)).toEqual(token);
        expect(getUser(state)).toEqual(user);
        expect(getSnackbar(state)).toEqual({ message: 'Test Message', isOpen: true, severity: 'info' });
        expect(getWallet(state)).toEqual(wallet);
    });
});
