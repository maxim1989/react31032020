import { thunk } from './thunk';

describe('Test thunk middleware', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const next = jest.fn();

    afterEach(() => {
        next.mockReset();
    });

    test('thunk serve action', () => {
        const action = { type: 'someAction' };

        thunk({ dispatch, getState })(next)(action);

        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(getState).toHaveBeenCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(action);
    });

    test('thunk serve async action', () => {
        const action = jest.fn();

        thunk({ dispatch, getState })(next)(action);

        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(getState).toHaveBeenCalledTimes(0);
        expect(action).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledTimes(0);
        expect(action).toHaveBeenCalledWith(dispatch, getState);
    });
});
