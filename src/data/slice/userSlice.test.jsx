import { userReducer } from './userSlice';

import {user as userData} from "../../Utils/testData";
describe('userSlice reducer', () => {
    test('should handle setUser', () => {
        const initialState = null;
        const user = userData;
        const action = {
            type: 'user/setUser',
            payload: user,
        };
        const state = userReducer(initialState, action);
        expect(state).toEqual(user);
    });

    test('should handle clearUser', () => {
        const initialState = userData;
        const action = {
            type: 'user/clearUser',
        };
        const state = userReducer(initialState, action);
        expect(state).toEqual(null);
    });

    test('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(null);
    });
});
