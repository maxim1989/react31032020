import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { lessonSeventeen } from './lesson-17/homework/asyncFlow';

export const createStore = () => configureStore({
    reducer: combineReducers({
        lessonSeventeen
    })
});
