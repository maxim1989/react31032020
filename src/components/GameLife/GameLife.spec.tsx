import React from 'react';
import { mount } from 'enzyme';

import { FieldSizeEnum, StartPercentEnum, AgeEnum, SpeedEnum, OperationEnum } from '@shared/enums';

import { GameLife } from './GameLife';

describe('Тестирование компонента GameLife:', () => {
    let wrapper;
    let instance;
    const mockCalculateData = jest.fn();
    const mockUpdateFieldSize = jest.fn();
    const mockUpdateStartPercent = jest.fn();
    const mockUpdateSpeed = jest.fn();
    const mockUpdateActive = jest.fn();

    beforeEach(() => {
        mockCalculateData.mockReset();
        mockUpdateFieldSize.mockReset();
        mockUpdateStartPercent.mockReset();
        mockUpdateSpeed.mockReset();
        mockUpdateActive.mockReset();
        wrapper = mount(<GameLife data={[{
                                      position: 0,
                                      age: 'white'
                                  }]}
                                  fieldSize={FieldSizeEnum.Small}
                                  startPercent={StartPercentEnum.Small}
                                  speed={SpeedEnum.Small}
                                  active={false}
                                  calculateData={mockCalculateData}
                                  updateFieldSize={mockUpdateFieldSize}
                                  updateStartPercent={mockUpdateStartPercent}
                                  updateSpeed={mockUpdateSpeed}
                                  updateActive={mockUpdateActive}
                        />
        );
        instance = wrapper.instance();
    });
    
    it('Нажать на кнопку установки размера поля - Small', () => {
        const button = wrapper.find(`button[data-size=${FieldSizeEnum.Small}]`);

        button.simulate('click');
        expect(mockUpdateFieldSize).toHaveBeenCalledTimes(1);
    });
    
    it('Нажать на кнопку установки начального процента заполнения поля - Small', () => {
        const button = wrapper.find(`button[data-percent=${StartPercentEnum.Small}]`);

        button.simulate('click');
        expect(mockUpdateStartPercent).toHaveBeenCalledTimes(1);
    });
});
