import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { saveUserData, removeUserData } from './actions';

export const auth = createReducer(false, {
    [saveUserData.type]: () => true,
    [removeUserData.type]: () => false
});
export const user = createReducer('', {
    [saveUserData.type]: (_state, action) => action.payload,
    [removeUserData.type]: () => ''
});

export const authication = combineReducers({
    auth,
    user
});
