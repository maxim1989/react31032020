import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { lessonSeventeen } from './lesson-17/homework/asyncFlow';
import { thunk } from './lesson-17/homework/thunk';
import { probablity } from './lesson-17/homework/probability';

const [, immutableStateInvariant, serializableStateInvariant] = getDefaultMiddleware();

export const createStore = () => configureStore({
    reducer: combineReducers({
        lessonSeventeen
    }),
    middleware: [thunk, immutableStateInvariant, serializableStateInvariant, probablity]
});
