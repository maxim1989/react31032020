import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';

import { lessonSeventeen } from './lesson-17/homework/asyncFlow';
import { authication } from './__data__/reducers';
import { thunk } from './lesson-17/homework/thunk';
import { probablity } from './lesson-17/homework/probability';

const [, immutableStateInvariant, serializableStateInvariant] = getDefaultMiddleware();

export const createStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: combineReducers({
            lessonSeventeen,
            authication
        }),
        middleware: [thunk, immutableStateInvariant, serializableStateInvariant, probablity, sagaMiddleware]
    });

    sagaMiddleware.run(rootSaga);

    return store;
};
