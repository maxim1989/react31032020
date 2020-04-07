/**
 * Операции + - * /
 */

interface Numbers {
    firstNumber: number;
    secondNumber: number;
};

export function sum(data: Numbers): number {
    const { firstNumber, secondNumber } = data;
    const result: number = firstNumber + secondNumber;

    return result;
};

export function sub(data: Numbers): number {
    const { firstNumber, secondNumber } = data;
    const result: number = firstNumber - secondNumber;

    return result;
};

export function mul(data: Numbers): number {
    const { firstNumber, secondNumber } = data;
    const result: number = firstNumber * secondNumber;

    return result;
};

export function div(data: Numbers): number | never {
    const { firstNumber, secondNumber } = data;

    if (secondNumber === 0) {
        throw new Error('Division by zero');
    }

    const result: number = firstNumber / secondNumber;

    return result;
};
