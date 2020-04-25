import React from 'react';
import { shallow } from 'enzyme';

import { Item, contentStyleDict } from './Item';

describe('Тестирование модуля Item.tsx:', () => {
    describe('Компонент Item:', () => {
        it('shallow:', () => {
            const mockHandleClick = jest.fn();
            const wrapper = shallow(<Item content={1} position={1} handleClick={mockHandleClick} />);
    
            wrapper.simulate('click');

            expect(mockHandleClick).toHaveBeenCalledTimes(1);
            expect(wrapper.html()).toBe('<div data-position="1" class="css-1in9esn-wrapperStyle"><span class="css-am7yxk-circleStyle"></span></div>');
        });
    });

    describe('contentStyleDict:', () => {
        it('key=1:', () => {
            const result = contentStyleDict[1];

            expect(result.styles).toBe('border-radius:55px;height:100px;width:100px;border:4px solid black;;label:circleStyle;');
        });

        it('key=2:', () => {
            const result = contentStyleDict[2];

            expect(result.styles).toBe('display:block;position:relative;width:100%;height:100%;&:before{content:" ";position:absolute;height:100px;width:4px;transform:rotate(45deg);background-color:black;top:10%;left:50%;}&:after{content:" ";position:absolute;height:100px;width:4px;transform:rotate(-45deg);background-color:black;top:10%;left:50%;};label:crossStyle;');
        });

        it('key=any:', () => {
            const result = contentStyleDict[5];

            expect(result).toBe(undefined);
        });
    });
});
