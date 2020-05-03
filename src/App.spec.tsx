import React from 'react';
import { mount } from 'enzyme';

import { App } from './App';
import { Auth } from './components/Auth';

describe('Тесты App:', () => {
    it('написать текст в поле "Введите ваше имя":', () => {
        const wrapper = mount(<App />);
        const nameInput = wrapper.find(Auth).find('input[type="text"]');

        nameInput.simulate('change', { target: { value: 'My Name' } });

        expect(wrapper.find('input[type="text"]').prop('value')).toBe('My Name');
    });

    it('нажать кнорку "start", когда поле "Введите ваше имя" пустое:', () => {
        const wrapper = mount(<App />).find(Auth);
        const submitInput = wrapper.find('input[type="submit"]');

        submitInput.simulate('click');

        expect(wrapper.find('input[type="text"]').prop('value')).toBe('');
    });

    it('нажать кнорку "start", когда поле "Введите ваше имя" заполнено:', () => {
        const wrapper = mount(<App />).find(Auth);
        const nameInput = wrapper.find('input[type="text"]');
        const submitInput = wrapper.find('input[type="submit"]');

        nameInput.simulate('change', { target: { value: 'My Name' } });
        submitInput.simulate('click');

        setTimeout(() => expect(wrapper.find('input[type="text"]').exists()).toBe(false), 1000);
    });
});
