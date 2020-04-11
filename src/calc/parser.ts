import * as _ from 'lodash';

import { Priority, simpleOperation, symbols } from './constants';

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
    const match: ArrayOfStrings = str.match(/! [0-9]+/g);
    const step: FactorialObject[] = match ? match.map(match => ({
        match,
        converted: '' + factorial(parseInt(match.replace('! ', '')))
    })) : [];

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

export function parser(str: string): number {
    str = str.trim();

    let firstIndex: number = str.indexOf('(');
    let lastIndex: number = -1;

    while (firstIndex >= 0) {
        let count: number = 1;

        for (let i: number = firstIndex + 1; i < str.length; i++) {
            if (str[i] === '(' && count !== 0) {
                count++;
            }

            if (str[i] === ')') {
                count--;
            }

            if (count === 0) {
                lastIndex = i;
                break;
            }
        }

        const subStr: string = str.slice(firstIndex + 1, lastIndex);

        str = str.replace(`(${subStr})`, '' + parser(subStr));
        firstIndex = str.indexOf('(');
    }

    const factorialToMul = formatFactorialToMul(str);
    const squardToDegree = formatSquardToDegree(factorialToMul);
    const splittedString: ArrayOfStrings = splitBySpace(squardToDegree);
    const stringToNumber: ArrayOfStringsNumbers = strToNumber(splittedString);
    const result: number = calc(stringToNumber);
    
    return result;
}

export function validator(str: string): void {
    str = str.replace(/ /g, '');
    let count = 0;

    if (['*', '/', '^', '.', ','].indexOf(str[0]) >= 0) {
        throw new Error('Incorrect start');
    }

    if (['!', '*', '/', '^', '+', '-', '.', ','].indexOf(str[str.length - 1]) >= 0) {
        throw new Error('Incorrect end');
    }

    for (let i: number = 0; i < str.length; i++) {
        if (!symbols[str[i]]) {
            throw new Error(`Wrong symbol: ${str[i]}`);
        }

        if (str[i] === '(') {
            count++;
        }

        if (str[i] === ')') {
            count--;
        }

        if (count < 0) {
            throw new Error('Incorrect bracket sequence');
        }
    }

    for (let i: number = 1; i < str.length; i++) {
        if (str[i] === '^' && str[i-1] === '^') {
            throw new Error('Double symbol');
        }

        if (str[i] === '/' && str[i-1] === '/') {
            throw new Error('Double symbol');
        }
        
        if ((str[i] === '/' || str[i] === '*' || str[i] === '^') && (str[i-1] === '-' || str[i-1] === '+')) {
            throw new Error('Double symbol');
        }
        
        if (str[i] === '/' && str[i-1] === '*') {
            throw new Error('Double symbol');
        }
        
        if (str[i] === '*' && str[i-1] === '/') {
            throw new Error('Double symbol');
        }
    }

    const stars = str.match(/[*]+/g);

    if (stars) {
        for (let i: number = 0; i < stars.length; i++) {
            if (stars[i].length > 3) {
                throw new Error('Too many *');
            }
        }
    }
}

export function formatter(str: string): string {
    str = str.replace(/ /g, '');
    str = str.replace(/\,/g, '.');
    str = str.replace(/\+/g, ' + ');
    str = str.replace(/\//g, ' / ');
    str = str.replace(/\-/g, ' - ');
    str = str.replace(/\!/g, ' ! ');
    str = str.replace(/\*/g, ' * ');
    str = str.replace(/\^/g, ' ^ ');
    str = str.replace(/\(/g, ' ( ');
    str = str.replace(/\)/g, ' ) ');
    str = str.replace(/  /g, ' ');
    str = str.replace(/ \* \* /g, ' ** ');
    str = str.trim();

    return str;
}

export function main(str: string): number {
    validator(str);
    
    return parser(formatter(str));
}
