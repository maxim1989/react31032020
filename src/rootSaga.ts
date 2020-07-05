import { put, takeLatest, call } from 'redux-saga/effects';

import { store } from '@shared/storage/sessionStorage';
import { randomInteger } from '@shared/utils';
import { AgeEnum } from '@shared/enums';

import { StartPercent, RandomStoreType, FieldSize } from './components/GameLife/GameLifeInterfaces';
import { CellInterface } from './components/GameLife/components/Cell';
import { login, logout, checkoAuth, saveUserData, removeUserData } from './__data__/actions';
import { calculateData, updateData } from './components/GameLife/__data__/gameLife';

export const generateRandomNumbers = (fieldSize:FieldSize, startPercent:StartPercent): RandomStoreType => {
    const store: RandomStoreType = {};
    const max = fieldSize * (fieldSize - 20) - 1;
    const storeLength = Math.round(startPercent * max / 100);
    let count:number = 0;

    while (count < storeLength) {
        const num: number = randomInteger(0, max);

        if (!store[num]) {
            store[num] = true;
            count++;
        }
    }

    return store;
};

export const createData = (l: FieldSize, p: StartPercent):CellInterface[] => {
    const dataLength: number = l * (l - 20);
    const randomNumbers: RandomStoreType = generateRandomNumbers(l, p);
    
    return [...new Array(dataLength)].map((_, position): CellInterface => {
        const age = randomNumbers[position] ? AgeEnum.Small : AgeEnum.Empty;

        return {
            position,
            age 
        };
    });
};

export function* makeLogin({ payload } : ReturnType<typeof login>) {
    try {
        yield store.setItem('user', payload);
        yield put(saveUserData(payload));
    } catch {
        console.error('LOGIN_ERROR');
    }
};

export function* makeLogout() {
    try {
        yield store.removeItem('user');
        yield put(removeUserData());
    } catch {
        console.error('LOGOUT_ERROR');
    }
};

export function* makeCheckAuth() {
    const user = yield store.getItem('user');

    if (user) {
        yield put(saveUserData(user));
    }
};

export function* makeCalculateData({ payload }: ReturnType<typeof calculateData>) {
    const { fieldSize, startPercent } = payload;
    const data = yield call(createData, fieldSize, startPercent);

    yield put(updateData(data));
};

export default function* rootSaga() {
    yield takeLatest(login.type, makeLogin);
    yield takeLatest(logout.type, makeLogout);
    yield takeLatest(checkoAuth.type, makeCheckAuth);
    yield takeLatest(calculateData.type, makeCalculateData);
};
