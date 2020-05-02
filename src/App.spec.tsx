import React from 'react';
import { shallow } from 'enzyme';

import { App } from './App';

describe('Тесты App:', () => {
    it('setUser:', () => {
        const wrapper = shallow(<App />);
        const nameInput = wrapper.find('input[type="text"]');

        nameInput.simulate('change', { target: { value: 'My Name' } });

        expect(wrapper.find('input[type="text"]').prop('value')).toBe('My Name');
    });

    it('onSubmit:', () => {
        const wrapper = shallow(<App />);
        const submitInput = wrapper.find('input[type="submit"]');

        submitInput.simulate('click');

        expect(wrapper.find('input[type="text"]').prop('value')).toBe('');
    });

    it('setUser, onSubmit:', () => {
        const wrapper = shallow(<App />);
        const nameInput = wrapper.find('input[type="text"]');
        const submitInput = wrapper.find('input[type="submit"]');

        nameInput.simulate('change', { target: { value: 'My Name' } });
        submitInput.simulate('click');

        setTimeout(() => expect(wrapper.find('input[type="text"]').exists()).toBe(false), 1000);
    });
});
