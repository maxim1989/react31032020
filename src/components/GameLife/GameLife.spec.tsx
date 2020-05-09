import React from 'react';
import { shallow, mount } from 'enzyme';

import { FieldSizeEnum, StartPercentEnum, AgeEnum, SpeedEnum, OperationEnum } from '@shared/enums';

import { GameLife, GameLifeState, FieldSize, StartPercent } from './GameLife';
import { CellInterface } from './components/Cell';
import { HandleFieldSize } from './components/BlockSize';

class Instance extends React.Component<{}, GameLifeState> {
    generateRandomNumbers(fieldSize:FieldSize, startPercent:StartPercent) {
        return 'generateRandomNumbers';
    }
    
    createData(fieldSize:FieldSize, startPercent:StartPercent): CellInterface[] {
        return [];
    }

    handleFieldSize: HandleFieldSize = () => {}
}

describe('Тестирование компонента GameLife:', () => {
    let wrapper: any;
    let instance: any;

    beforeEach(() => {
        wrapper = mount<Instance>(<GameLife />);
        instance = wrapper.instance();
    });

    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Small, StartPercentEnum.Small)', () => {
        const result = instance.generateRandomNumbers(FieldSizeEnum.Small, StartPercentEnum.Small);

        expect(Object.keys(result).length).toBe(150);
    });
    
    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Small, StartPercentEnum.Medium)', () => {
        const result = instance.generateRandomNumbers(FieldSizeEnum.Small, StartPercentEnum.Medium);

        expect(Object.keys(result).length).toBe(450);
    });
    
    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Small, StartPercentEnum.Big)', () => {
        const result = instance.generateRandomNumbers(FieldSizeEnum.Small, StartPercentEnum.Big);

        expect(Object.keys(result).length).toBe(750);
    });

    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Medium, StartPercentEnum.Small)', () => {
        const result = instance.generateRandomNumbers(FieldSizeEnum.Medium, StartPercentEnum.Small);

        expect(Object.keys(result).length).toBe(350);
    });
    
    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Medium, StartPercentEnum.Medium)', () => {
        const result = instance.generateRandomNumbers(FieldSizeEnum.Medium, StartPercentEnum.Medium);

        expect(Object.keys(result).length).toBe(1050);
    });
    
    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Medium, StartPercentEnum.Big)', () => {
        const result = instance.generateRandomNumbers(FieldSizeEnum.Medium, StartPercentEnum.Big);

        expect(Object.keys(result).length).toBe(1750);
    });

    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Big, StartPercentEnum.Small)', () => {
        const result = instance.generateRandomNumbers(FieldSizeEnum.Big, StartPercentEnum.Small);

        expect(Object.keys(result).length).toBe(800);
    });
    
    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Big, StartPercentEnum.Medium)', () => {
        const result = instance.generateRandomNumbers(FieldSizeEnum.Big, StartPercentEnum.Medium);

        expect(Object.keys(result).length).toBe(2400);
    });
    
    it('Создание объекта, содержащего переданное количество целых чисел, generateRandomNumbers(FieldSizeEnum.Big, StartPercentEnum.Big)', () => {
        const result = instance.generateRandomNumbers(FieldSizeEnum.Big, StartPercentEnum.Big);

        expect(Object.keys(result).length).toBe(4000);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Small, StartPercentEnum.Small)', () => {
        const result = instance.createData(FieldSizeEnum.Small, StartPercentEnum.Small);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(1500);
        expect(filledCount.length).toBe(150);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Small, StartPercentEnum.Medium)', () => {
        const result = instance.createData(FieldSizeEnum.Small, StartPercentEnum.Medium);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(1500);
        expect(filledCount.length).toBe(450);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Small, StartPercentEnum.Big)', () => {
        const result = instance.createData(FieldSizeEnum.Small, StartPercentEnum.Big);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(1500);
        expect(filledCount.length).toBe(750);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Medium, StartPercentEnum.Small)', () => {
        const result = instance.createData(FieldSizeEnum.Medium, StartPercentEnum.Small);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(3500);
        expect(filledCount.length).toBe(350);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Medium, StartPercentEnum.Medium)', () => {
        const result = instance.createData(FieldSizeEnum.Medium, StartPercentEnum.Medium);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(3500);
        expect(filledCount.length).toBe(1050);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Medium, StartPercentEnum.Big)', () => {
        const result = instance.createData(FieldSizeEnum.Medium, StartPercentEnum.Big);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(3500);
        expect(filledCount.length).toBe(1750);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Big, StartPercentEnum.Small)', () => {
        const result = instance.createData(FieldSizeEnum.Big, StartPercentEnum.Small);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(8000);
        expect(filledCount.length).toBe(800);
    });
    
    it('Создание массива ячеек, createData(FieldSizeEnum.Big, StartPercentEnum.Medium)', () => {
        const result = instance.createData(FieldSizeEnum.Big, StartPercentEnum.Medium);
        const filledCount = result.filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(result.length).toBe(8000);
        expect(filledCount.length).toBe(2400);
    });
    
    it('Нажать на кнопку установки размера поля - Small', () => {
        const button = wrapper.find(`button[data-size=${FieldSizeEnum.Small}]`);

        button.simulate('click');
        expect(wrapper.state('fieldSize')).toBe(FieldSizeEnum.Small);
        expect(wrapper.state('active')).toBe(false);
    });
    
    it('Нажать на кнопку установки размера поля - Medium', () => {
        const button = wrapper.find(`button[data-size=${FieldSizeEnum.Medium}]`);

        button.simulate('click');
        expect(wrapper.state('fieldSize')).toBe(FieldSizeEnum.Medium);
        expect(wrapper.state('active')).toBe(false);
    });
    
    it('Нажать на кнопку установки размера поля - Big', () => {
        const button = wrapper.find(`button[data-size=${FieldSizeEnum.Big}]`);

        button.simulate('click');
        expect(wrapper.state('fieldSize')).toBe(FieldSizeEnum.Big);
        expect(wrapper.state('active')).toBe(false);
    });
    
    it('Нажать на кнопку установки начального процента заполнения поля - Small', () => {
        const button = wrapper.find(`button[data-percent=${StartPercentEnum.Small}]`);

        button.simulate('click');
        expect(wrapper.state('startPercent')).toBe(StartPercentEnum.Small);
        expect(wrapper.state('active')).toBe(false);
    });
    
    it('Нажать на кнопку установки начального процента заполнения поля - Medium', () => {
        const button = wrapper.find(`button[data-percent=${StartPercentEnum.Medium}]`);

        button.simulate('click');
        expect(wrapper.state('startPercent')).toBe(StartPercentEnum.Medium);
        expect(wrapper.state('active')).toBe(false);
    });
    
    it('Нажать на кнопку установки начального процента заполнения поля - Big', () => {
        const button = wrapper.find(`button[data-percent=${StartPercentEnum.Big}]`);

        button.simulate('click');
        expect(wrapper.state('startPercent')).toBe(StartPercentEnum.Big);
        expect(wrapper.state('active')).toBe(false);
    });
    
    it('Нажать на кнопку уменьшения скорости - Slower', () => {
        const button = wrapper.find(`button[data-operation="${OperationEnum.Slower}"]`);

        button.simulate('click');
        expect(wrapper.state('speed')).toBe(SpeedEnum.Small);
    });
    
    it('Нажать на кнопку увеличения скорости - Faster', () => {
        const button = wrapper.find(`button[data-operation="${OperationEnum.Faster}"]`);

        button.simulate('click');
        expect(wrapper.state('speed')).toBe(SpeedEnum.Big);
    });
    
    it('Нажать на кнопку паузы - Pause', () => {
        const button = wrapper.find(`button[data-operation="${OperationEnum.Pause}"]`);

        button.simulate('click');
        expect(wrapper.state('active')).toBe(false);
    });
    
    it('Нажать на кнопку запуска игры - Play', () => {
        const button = wrapper.find(`button[data-operation="${OperationEnum.Play}"]`);

        button.simulate('click');
        expect(wrapper.state('active')).toBe(true);
    });
    
    it('Сбросить до начальных настроек', () => {
        const button = wrapper.find('button[name="reset"]');

        button.simulate('click');
        expect(wrapper.state('active')).toBe(false);

        const filledCount = wrapper.state('data').filter((item: CellInterface) => item.age === AgeEnum.Small);

        expect(wrapper.state('data').length).toBe(1500);
        expect(filledCount.length).toBe(450);
    });
});
