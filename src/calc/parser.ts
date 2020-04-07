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
    const step_1: ArrayOfStringsNumbers = calcStep(arr, 2);
    const step_2: Array<number> = calcStep(step_1, 1);

    return step_2[0];
}

export function parse(str: string): number {
    const splittedString: ArrayOfStrings = splitBySpace(str);
    const formattedString: ArrayOfStringsNumbers = strToNumber(splittedString);
    const result: number = calc(formattedString);
    
    return result;
}