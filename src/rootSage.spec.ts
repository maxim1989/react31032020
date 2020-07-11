import { makeLogin, makeLogout, makeCheckAuth, createData, generateRandomNumbers } from './rootSaga';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import { login, saveUserData, removeUserData } from './__data__/actions';
import { store } from '@shared/storage/sessionStorage';
import { FieldSizeEnum, StartPercentEnum, AgeEnum } from '@shared/enums';
import { CellInterface } from './components/GameLife/components/Cell';

describe('Data calculation', () => {
    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Small, StartPercentEnum.Small)', () => {
        const result = generateRandomNumbers(FieldSizeEnum.Small, StartPercentEnum.Small);

        expect(Object.keys(result).length).toBe(150);
    });
    
    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Small, StartPercentEnum.Medium)', () => {
        const result = generateRandomNumbers(FieldSizeEnum.Small, StartPercentEnum.Medium);

        expect(Object.keys(result).length).toBe(450);
    });
    
    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Small, StartPercentEnum.Big)', () => {
        const result = generateRandomNumbers(FieldSizeEnum.Small, StartPercentEnum.Big);

        expect(Object.keys(result).length).toBe(750);
    });

    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Medium, StartPercentEnum.Small)', () => {
        const result = generateRandomNumbers(FieldSizeEnum.Medium, StartPercentEnum.Small);

        expect(Object.keys(result).length).toBe(350);
    });
    
    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Medium, StartPercentEnum.Medium)', () => {
        const result = generateRandomNumbers(FieldSizeEnum.Medium, StartPercentEnum.Medium);

        expect(Object.keys(result).length).toBe(1050);
    });
    
    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Medium, StartPercentEnum.Big)', () => {
        const result = generateRandomNumbers(FieldSizeEnum.Medium, StartPercentEnum.Big);

        expect(Object.keys(result).length).toBe(1750);
    });

    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Big, StartPercentEnum.Small)', () => {
        const result = generateRandomNumbers(FieldSizeEnum.Big, StartPercentEnum.Small);

        expect(Object.keys(result).length).toBe(800);
    });
    
    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Big, StartPercentEnum.Medium)', () => {
        const result = generateRandomNumbers(FieldSizeEnum.Big, StartPercentEnum.Medium);

        expect(Object.keys(result).length).toBe(2400);
    });
    
    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Big, StartPercentEnum.Big)', () => {
        const result = generateRandomNumbers(FieldSizeEnum.Big, StartPercentEnum.Big);

        expect(Object.keys(result).length).toBe(4000);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Small, StartPercentEnum.Small)', () => {
        const result = createData(FieldSizeEnum.Small, StartPercentEnum.Small);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(1500);
        expect(filledCount.length).toBe(150);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Small, StartPercentEnum.Medium)', () => {
        const result = createData(FieldSizeEnum.Small, StartPercentEnum.Medium);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(1500);
        expect(filledCount.length).toBe(450);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Small, StartPercentEnum.Big)', () => {
        const result = createData(FieldSizeEnum.Small, StartPercentEnum.Big);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(1500);
        expect(filledCount.length).toBe(750);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Medium, StartPercentEnum.Small)', () => {
        const result = createData(FieldSizeEnum.Medium, StartPercentEnum.Small);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(3500);
        expect(filledCount.length).toBe(350);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Medium, StartPercentEnum.Medium)', () => {
        const result = createData(FieldSizeEnum.Medium, StartPercentEnum.Medium);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(3500);
        expect(filledCount.length).toBe(1050);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Medium, StartPercentEnum.Big)', () => {
        const result = createData(FieldSizeEnum.Medium, StartPercentEnum.Big);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(3500);
        expect(filledCount.length).toBe(1750);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Big, StartPercentEnum.Small)', () => {
        const result = createData(FieldSizeEnum.Big, StartPercentEnum.Small);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(8000);
        expect(filledCount.length).toBe(800);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Big, StartPercentEnum.Medium)', () => {
        const result = createData(FieldSizeEnum.Big, StartPercentEnum.Medium);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(8000);
        expect(filledCount.length).toBe(2400);
    });
});

describe('auth saga', () => {
    const mockSetItem = jest.fn();
    const mockRemoveItem = jest.fn();
    const mockgetItem = jest.fn();
    
    beforeEach(() => {
        store.setItem = mockSetItem;
        store.removeItem = mockRemoveItem;
        store.getItem = mockgetItem;
    });

    afterEach(() => {
        mockSetItem.mockReset();
        mockRemoveItem.mockReset();
        mockgetItem.mockReset();
    });

    it('makeLogin', () => {
        const gen = cloneableGenerator(makeLogin)({payload: 'user', type: login.type});

        gen.next();
        expect(mockSetItem).toHaveBeenCalledTimes(1);

        const put = gen.next();
        
        expect(put.value.type).toBe('PUT');
        expect(put.value.payload.action).toEqual({ type: saveUserData.type, payload: 'user' });

        const finish = gen.next();
        expect(finish.done).toBe(true);
    });

    it('makeLogout', () => {
        const gen = cloneableGenerator(makeLogout)();

        gen.next();
        expect(mockRemoveItem).toHaveBeenCalledTimes(1);

        const put = gen.next();
        
        expect(put.value.type).toBe('PUT');
        expect(put.value.payload.action).toEqual({ type: removeUserData.type });

        const finish = gen.next();
        expect(finish.done).toBe(true);
    });

    it('makeCheckAuth - user empty', () => {
        const gen = cloneableGenerator(makeCheckAuth)();

        gen.next();
        expect(mockgetItem).toHaveBeenCalledTimes(1);

        const finish = gen.next();
        expect(finish.done).toBe(true);
    });

    it('makeCheckAuth - user exist', () => {
        mockgetItem.mockReturnValue('user');

        const gen = cloneableGenerator(makeCheckAuth)();
        const user = gen.next();
        expect(mockgetItem).toHaveBeenCalledTimes(1);

        const put = gen.next(user.value);
        expect(put.value.type).toBe('PUT');
        expect(put.value.payload.action).toEqual({ type: saveUserData.type, payload: 'user' });

        const finish = gen.next();
        expect(finish.done).toBe(true);
    });
});