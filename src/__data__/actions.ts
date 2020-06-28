import { createAction } from '@reduxjs/toolkit';

export const login = createAction<string>('LOGIN');
export const saveUserData = createAction<string>('SAVE_USER_DATA');
export const logout = createAction('LOGOUT');
export const removeUserData = createAction('REMOVE_USER_DATA');
export const checkoAuth = createAction('CHECK_AUTH');