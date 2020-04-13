import React from 'react';
import { shallow } from 'enzyme';

import HelloWorld from './HelloWorld';

describe('Тестирование модуля HelloWorld.ts:', () => {
    it('shallow:', () => {
        const wrapper = shallow(<HelloWorld name="Test Name" />);

        expect(wrapper.html()).toBe('<h1>Hello world, Test Name!</h1>');
    });
});
