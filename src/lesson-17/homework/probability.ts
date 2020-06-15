import { Middleware } from 'redux';
import { createAction } from '@reduxjs/toolkit';

import { randomInteger } from '@shared/utils';
/*
Курс React, урок 17: Middlewares
Домашнее задание 3
src/lesson17/homework/probability.ts
Напишите свой probablity middleware:
Если action имеет поле `meta.probability` то пусть он исполнится с этой вероятностью
probablity это число от 0 до 1
// Пример с 50% вероятностью
`dispatch({ type: 'ANALYTICS_CLICK', meta: { probability: 0.5 }})` 
+1 балл за свой probablity middleware и подключение в приложение
+1 балл за тесты
*/
interface Probability {
    probability: number
}

interface AnalyticsClick {
    meta: Probability
}

export const lessonSeventeenAnalyticsClick = createAction<AnalyticsClick>('ANALYTICS_CLICK');

export const probablity: Middleware = () => (next) => (action) => {
    if (action.type === 'ANALYTICS_CLICK') {
        const number = randomInteger(0, 10);
        console.log('---------------------probablity Middleware');
        console.log('    number =', number);
        console.log('    probability =', action.payload.meta.probability);
        console.log('    execute action =', number <= action.payload.meta.probability * 10);
        console.log('---------------------');

        if (number <= action.payload.meta.probability * 10) {
            return next(action);
        }

        return;
    }

    return next(action);
};
