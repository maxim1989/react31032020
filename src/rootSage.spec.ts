import { makeLogin, makeLogout, makeCheckAuth } from './rootSaga';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import { login, logout, checkoAuth, saveUserData, removeUserData } from './__data__/actions';
import { store } from '@shared/storage/sessionStorage';

describe('auth saga', () => {
    const mockSetItem = jest.fn();
    const mockRemoveItem = jest.fn();
    const mockgetItem = jest.fn();
    
    beforeEach(() => {
        store.setItem = mockSetItem;
        store.removeItem = mockRemoveItem;
        store.getItem = mockgetItem;
    });

    afterEach(() => {
        mockSetItem.mockReset();
        mockRemoveItem.mockReset();
        mockgetItem.mockReset();
    });

    it('makeLogin', () => {
        const gen = cloneableGenerator(makeLogin)({payload: 'user', type: login.type});

        gen.next();
        expect(mockSetItem).toHaveBeenCalledTimes(1);

        const put = gen.next();
        
        expect(put.value.type).toBe('PUT');
        expect(put.value.payload.action).toEqual({ type: saveUserData.type, payload: 'user' });

        const finish = gen.next();
        expect(finish.done).toBe(true);
    });

    it('makeLogout', () => {
        const gen = cloneableGenerator(makeLogout)();

        gen.next();
        expect(mockRemoveItem).toHaveBeenCalledTimes(1);

        const put = gen.next();
        
        expect(put.value.type).toBe('PUT');
        expect(put.value.payload.action).toEqual({ type: removeUserData.type });

        const finish = gen.next();
        expect(finish.done).toBe(true);
    });

    it('makeCheckAuth - user empty', () => {
        const gen = cloneableGenerator(makeCheckAuth)();

        gen.next();
        expect(mockgetItem).toHaveBeenCalledTimes(1);

        const finish = gen.next();
        expect(finish.done).toBe(true);
    });

    it('makeCheckAuth - user exist', () => {
        mockgetItem.mockReturnValue('user');

        const gen = cloneableGenerator(makeCheckAuth)();
        const user = gen.next();
        expect(mockgetItem).toHaveBeenCalledTimes(1);

        const put = gen.next(user.value);
        expect(put.value.type).toBe('PUT');
        expect(put.value.payload.action).toEqual({ type: saveUserData.type, payload: 'user' });

        const finish = gen.next();
        expect(finish.done).toBe(true);
    });
});