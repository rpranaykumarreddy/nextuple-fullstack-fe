import {  statementReducer } from '../statementSlice';
import {statementData} from "../../../Utils/testData";

describe('StatementSlice reducer', () => {
    test('should handle setStatement', () => {
        const initialState = null;
        const statement = statementData;
        const action = {
            type: 'statement/setStatement',
            payload: statement,
        };
        const state = statementReducer(initialState, action);
        expect(state).toEqual(statement);
    });

    test('should handle clearStatement', () => {
        const initialState = statementData;
        const action = {
            type: 'statement/clearStatement',
        };
        const state = statementReducer(initialState, action);
        expect(state).toEqual(null);
    });

    test('should return the initial state', () => {
        expect(statementReducer(undefined, {})).toEqual(null);
    });
});
