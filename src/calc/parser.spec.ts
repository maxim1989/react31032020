import {
    splitBySpace,
    strToNumber,
    calc,
    isNumber,
    calcStep,
    formatSquardToDegree,
    formatFactorialToMul
} from './parser';

describe('Тестирование парсера:', () => {
    describe('splitBySpace:', () => {
        it('3 + 3 - 3 / 3', () => {
            expect(splitBySpace('3 + 3 - 3 / 3')).toEqual(['3', '+', '3', '-', '3', '/', '3']);
        });
    });

    describe('isNumber:', () => {
        it('1', () => {
            expect(isNumber(1)).toBe(true);
        });

        it('"1"', () => {
            expect(isNumber('1')).toBe(true);
        });

        it('+', () => {
            expect(isNumber('+')).toBe(false);
        });
    });

    describe('strToNumber:', () => {
        it('[\'1\', \'+\', \'22\']', () => {
            expect(strToNumber(['1', '+', '22'])).toEqual([1, '+', 22]);
        });
    });

    describe('calcStep:', () => {
        it('[1, "+", 22, "/", 2], 2', () => {
            expect(calcStep([1, '+', 22, '/', 2], 2)).toEqual([1, '+', 11]);
        });

        it('[1, "+", 22], 1', () => {
            expect(calcStep([1, '+', 22], 1)).toEqual([23]);
        });

        it('[2, "^", 2], 3', () => {
            expect(calcStep([2, '^', 2], 3)).toEqual([4]);
        });

        it('[1, "+", 2, "^", 2], 3', () => {
            expect(calcStep([1, '+', 2, '^', 2], 3)).toEqual([1, '+', 4]);
        });

        it('[1, "+", 2, "^", 2, "*", 4], 3', () => {
            expect(calcStep([1, '+', 2, '^', 2, '*', 4], 3)).toEqual([1, '+', 4, '*', 4]);
        });
    });

    describe('calc:', () => {
        it('[1, \'+\', 22]', () => {
            expect(calc([1, '+', 22])).toBe(23);
        });

        it('[1, \'+\', 22, \'/\', 2]', () => {
            expect(calc([1, '+', 22, '/', 2])).toBe(12);
        });

        it('[1, \'*\', 2, \'+\', 22, \'/\', 2]', () => {
            expect(calc([1, '*', 2, '+', 22, '/', 2])).toBe(13);
        });

        it('[-1, "*", 1, "*", 2, "+", 22, "/", 2]', () => {
            expect(calc([-1, '*', 1, '*', 2, '+', 22, '/', 2])).toBe(9);
        });

        it('[-1, "*", 1, "*", -2, "+", 22, "/", 2]', () => {
            expect(calc([-1, '*', 1, '*', -2, '+', 22, '/', 2])).toBe(13);
        });

        it('[1, "-", 1]', () => {
            expect(calc([1, '-', 1])).toBe(0);
        });
    });

    describe('formatSquardToDegree:', () => {
        it('2 **', () => {
            expect(formatSquardToDegree('2 **')).toBe('2 ^ 2');
        });

        it('2 ** + 2', () => {
            expect(formatSquardToDegree('2 ** + 2')).toBe('2 ^ 2 + 2');
        });

        it('2 ** * 2 + 2', () => {
            expect(formatSquardToDegree('2 ** * 2 + 2')).toBe('2 ^ 2 * 2 + 2');
        });
    });

    describe('formatFactorialToMul:', () => {
        it('! 3', () => {
            expect(formatFactorialToMul('! 3')).toBe('1 * 2 * 3');
        });

        
        it('! 3 + ! 2', () => {
            expect(formatFactorialToMul('! 3 + ! 2')).toBe('1 * 2 * 3 + 1 * 2');
        });
    });
});