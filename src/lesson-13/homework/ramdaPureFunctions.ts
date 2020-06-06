import {
    compose,
    descend,
    sort,
    prop,
    toPairs,
    mapAccum,
    replace,
    split,
    map,
    fromPairs
} from 'ramda';

// Задание 1
export type Team = { name: string; score: number };

export const getTopName = compose((arr: Team[]) => arr[0].name, sort(descend(prop('score'))));

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = compose((arr: Array<string | string[]>) => arr[0], mapAccum((a: string, c: string[]) => [`${a ? a + '&' : '?'}${c[0]}=${c[1]}`, null], ''), toPairs);

// Задание 3
export const parseQs = compose(fromPairs, map(split('=')), split('&'), replace('?', ''));