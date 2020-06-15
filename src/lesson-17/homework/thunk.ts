import { Middleware } from 'redux';

/*
Курс React, урок 17: Middlewares
Домашнее задание 2
src/lesson17/homework/thunk.ts
Напишите свой thunk middleware и подключите в приложение
+1 балл за свой thunk middleware и подключение в приложение
+1 балл за тесты
*/

export const thunk: Middleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
        return action(dispatch, getState);
    }

    return next(action);
};
