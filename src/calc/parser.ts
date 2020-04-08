import * as _ from 'lodash';

import { Priority, simpleOperation } from './constants';

type ArrayOfStrings = Array<string>;
type ArrayOfStringsNumbers = Array<number | string>;

export function splitBySpace(str: string): ArrayOfStrings {
    return str.split(' ');
}

export function isNumber(value: any): boolean {
    return !isNaN(value);
}

export function strToNumber(arr: ArrayOfStrings): ArrayOfStringsNumbers {
    return arr.map(item => {
        if (isNumber(item)) {
            return _.toNumber(item);
        }

        return item;
    });
}

export function factorial(num: number) {
    let rval: string = '1';

    for (let i: number = 2; i <= num; i++) {
        rval = rval  + ' * ' + i;
    }

    return rval;
}

interface FactorialObject {
    match: string;
    converted: string;
}

export function formatFactorialToMul(str: string): string {
    let result: string = str;
    const step: FactorialObject[] = str.match(/! [0-9]+/g).map(match => ({
        match,
        converted: '' + factorial(parseInt(match.replace('! ', '')))
    }));

    step.forEach((item: FactorialObject): void => {
        result = result.replace(item.match, item.converted);
    });

    return result;
}

export function formatSquardToDegree(str: string): string {
    return str.replace(/[*]{2}/g, '^ 2');
}

export function calcStep<T>(arr: ArrayOfStringsNumbers, priority: Priority): Array<T> {
    const tmp = [];
    const copiedArr: ArrayOfStringsNumbers = [...arr];

    copiedArr.forEach((item, idx) => {
        const currentPriority: number = simpleOperation[item] ? simpleOperation[item].priority : 0;

        if (currentPriority === priority) {
            const lastItem: number = tmp.pop();
            const action: Function = simpleOperation[item].action; 

            copiedArr[idx + 1] = action({firstNumber: lastItem, secondNumber: copiedArr[idx + 1]});
        } else {
            tmp.push(item);
        }
    });

    return tmp;
}

export function calc(arr: ArrayOfStringsNumbers): number {
    const step_1: ArrayOfStringsNumbers = calcStep(arr, 3);
    const step_2: Array<number> = calcStep(step_1, 2);
    const step_3: Array<number> = calcStep(step_2, 1);

    return step_3[0];
}

export function main(str: string): number {
    const factorialToMul = formatFactorialToMul(str);
    const squardToDegree = formatSquardToDegree(factorialToMul);
    const splittedString: ArrayOfStrings = splitBySpace(squardToDegree);
    const stringToNumber: ArrayOfStringsNumbers = strToNumber(splittedString);
    const result: number = calc(stringToNumber);
    
    return result;
}

// TODO запятую менять на точку
// TODO проверять на допустимые значения - 0123456789.!^*()-+/
// TODO строка не должна начинаться на **, *, /, ^, .
// TODO строка не должна заканчиваться на !, *, /, ^, +, -, .
// TODO после ! должно быть целое число N > 0