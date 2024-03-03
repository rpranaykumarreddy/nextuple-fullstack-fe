import { tokenReducer } from './tokenSlice';
import {token as tokenData} from "../../Utils/testData";
describe('tokenSlice reducer', () => {
    test('should handle setToken', () => {
        const initialState = null;
        const token =  tokenData;
        const action = {
            type: 'token/setToken',
            payload: token,
        };
        const state = tokenReducer(initialState, action);
        expect(state).toEqual(token);
    });

    test('should handle clearToken', () => {
        const initialState = tokenData;
        const action = {
            type: 'token/clearToken',
        };
        const state = tokenReducer(initialState, action);
        expect(state).toEqual(null);
    });

    test('should return the initial state', () => {
        expect(tokenReducer(undefined, {})).toEqual(null);
    });
});
