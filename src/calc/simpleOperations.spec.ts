import {
    sum,
    sub,
    mul,
    div
} from './simpleOperations';

describe('Тесты операций + - * /:', () => {
    it('+:', () => {
        expect(sum({firstNumber: 1, secondNumber: 2})).toBe(3);
        expect(sum({firstNumber: 0, secondNumber: 0})).toBe(0);
    });

    it('-:', () => {
        expect(sub({firstNumber: 1, secondNumber: 2})).toBe(-1);
        expect(sub({firstNumber: 1, secondNumber: 1})).toBe(0);
        expect(sub({firstNumber: 1, secondNumber: 0})).toBe(1);
        expect(sub({firstNumber: 10, secondNumber: 2})).toBe(8);
    });

    it('*:', () => {
        expect(mul({firstNumber: 1, secondNumber: 2})).toBe(2);
        expect(mul({firstNumber: 1, secondNumber: 0})).toBe(0);
        expect(mul({firstNumber: 0, secondNumber: 2})).toBe(0);
        expect(mul({firstNumber: 2, secondNumber: 2})).toBe(4);
    });

    it('/:', () => {
        expect(div({firstNumber: 1, secondNumber: 2})).toBe(0.5);
        expect(div({firstNumber: 2, secondNumber: 2})).toBe(1);
        expect(div({firstNumber: 2, secondNumber: 1})).toBe(2);
        expect(() => div({firstNumber: 2, secondNumber: 0})).toThrowError(Error);
    });
});
