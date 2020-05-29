// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => 
    teams.reduce((previousValue: Team, currentValue: Team) => previousValue.score > currentValue.score ? previousValue : currentValue,
    { name: '', score: -1 }).name;

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string => {
    const keys: string[] = Object.keys(qsObj);

    return keys.reduce((accumulator, currentValue) =>
        `${accumulator ? accumulator + '&' : '?'}${currentValue}=${qsObj[currentValue]}`,
        ''
    );
};

// Задание 3

export const parseQs = (qs: string): QsObj => {
    return qs.slice(1).split('&').map((item: string) => item.split('=')).reduce((store: QsObj, currentValue: string[]) => {
        store[currentValue[0]] = currentValue[1];

        return store;
    }, {});
};