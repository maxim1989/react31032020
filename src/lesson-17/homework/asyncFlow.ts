import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { RootState } from '../../';

/*
Курс React, урок 17: Middlewares
Домашнее задание 1
src/lesson17/homework/asyncFlow.ts
Напишите async flow который сходит в https://swapi.dev/api/people и сохранит данные в стейте
Нужна обработка различных состояний запроса и тесты
+1 балл за async flow который сохранит данные в стейте
+1 балл за обработку состояний реквеста в пути и ошибок
+1 балл за тесты
+1 балл за разнение по разных файлам и объединение в duck
*/

// Action creators
export const lessonSeventeenIsLoading = createAction('LESSON_SEVENTEEN_ISLOADING');
export const lessonSeventeenLoadSuccess = createAction<any>('LESSON_SEVENTEEN_LOAD_SUCCESS');
export const lessonSeventeenLoadFaild = createAction<any>('LESSON_SEVENTEEN_LOAD_FAILD');

// Thunks
type LinkType = string | null;

interface ResultItem {
    name: string,
    height: string,
    mass: string,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    homeworld: string,
    films: string[],
    species: string[],
    vehicles: string[],
    starships: string[],
    created: string,
    edited: string,
    url: string
}

export interface ResponseInterface {
    count: number,
    next: LinkType,
    previous: LinkType,
    results: ResultItem[]
}

export const fetchLessonSeventeenData = createAsyncThunk(
    'FETCH_LESSON_SEVENTEEN_DATA',
    async () => {
        const response = await fetch('https://swapi.dev/api/people/');
        
        return (await response.json()) as ResponseInterface;
    }
);

// Reducer
export const isLoading = createReducer(false, {
    [lessonSeventeenIsLoading.type]: (_state) => true,
    [lessonSeventeenLoadSuccess.type]: (_state) => false,
    [lessonSeventeenLoadFaild.type]: (_state) => false
});
export const error = createReducer(null, {
    [lessonSeventeenLoadSuccess.type]: (_state) => null,
    [lessonSeventeenLoadFaild.type]: (_state, action: any) => action.payload
});
export const data = createReducer(null, {
    [lessonSeventeenLoadSuccess.type]: (_state, action: any) => action.payload,
    [lessonSeventeenLoadFaild.type]: (_state) => null
});
export const lessonSeventeen = combineReducers({
    isLoading,
    error,
    data
});
