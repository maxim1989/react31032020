import { put, takeLatest } from 'redux-saga/effects';

import { login, logout, checkoAuth, saveUserData, removeUserData } from './__data__/actions';
import { store } from '@shared/storage/sessionStorage';

function* makeLogin({ payload } : ReturnType<typeof login>) {
    try {
        yield store.setItem('user', payload);
        yield put(saveUserData(payload));
    } catch {
        console.error('LOGIN_ERROR');
    }
};

function* makeLogout() {
    try {
        store.removeItem('user');
        yield put(removeUserData());
    } catch {
        console.error('LOGOUT_ERROR');
    }
};

function* makeCheckAuth() {
    const user = yield store.getItem('user');

    if (user) {
        yield put(saveUserData(user));
    }
};

export default function* rootSaga() {
    yield takeLatest(login.type, makeLogin);
    yield takeLatest(logout.type, makeLogout);
    yield takeLatest(checkoAuth.type, makeCheckAuth);
};
