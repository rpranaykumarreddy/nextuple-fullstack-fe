import { snackbarReducer } from '../snackbarSlice';

describe('snackbarSlice reducer', () => {
    test('should handle showMessage', () => {
        const initialState = {
            message: '',
            isOpen: false,
            severity: 'success',
        };
        const action = {
            type: 'snackbar/showMessage',
            payload: {
                message: 'Test message',
                severity: 'error',
            },
        };
        const state = snackbarReducer(initialState, action);
        expect(state.isOpen).toEqual(true);
        expect(state.message).toEqual('Test message');
        expect(state.severity).toEqual('error');
    });

    test('should handle hideMessage', () => {
        const initialState = {
            message: 'Test message',
            isOpen: true,
            severity: 'error',
        };
        const action = {
            type: 'snackbar/hideMessage',
        };
        const state = snackbarReducer(initialState, action);
        expect(state.isOpen).toEqual(false);
        expect(state.message).toEqual('');
        expect(state.severity).toEqual('success');
    });

    test('should return the initial state', () => {
        expect(snackbarReducer(undefined, {})).toEqual({
            message: '',
            isOpen: false,
            severity: 'success',
        });
    });
});
