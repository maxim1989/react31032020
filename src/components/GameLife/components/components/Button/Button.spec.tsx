import React from 'react';
import { shallow } from 'enzyme';
import serializer from 'jest-emotion';

import { Button } from './Button';

describe('Button:', () => {
    it('selected:', () => {
        const wrapper = shallow(<Button selected={true}/>);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('not selected:', () => {
        const wrapper = shallow(<Button selected={false}/>);

        expect(wrapper.html()).toMatchSnapshot();
    });
});