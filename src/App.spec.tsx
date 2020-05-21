import React from 'react';
import { mount } from 'enzyme';
import {
    BrowserRouter as Router
} from 'react-router-dom';

import { App } from './App';
import { Auth } from './components/Auth';
import { Button } from './components/GameLife/components/components/Button';

describe('Тесты App:', () => {
    const mockSetItem = jest.fn();
    const mockRemoveItem = jest.fn();
    const mockGetItem = jest.fn();
    const sessionStorageMock = {
        removeItem: mockRemoveItem,
        setItem: mockSetItem,
        getItem: mockGetItem
    };

    Object.defineProperty(window, 'sessionStorage', {
        value: sessionStorageMock
    });

    afterEach(() => {
        mockSetItem.mockReset();
        mockGetItem.mockReset();
        mockRemoveItem.mockReset();
    });

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

    it('press "start" button, then field "Введите ваше имя" is fullfilled and check if sessionstorage.setItem was called:', () => {
        

        const wrapper = mount(<Router><App /></Router>);
        const nameInput = wrapper.find('input[type="text"]');
        const form = wrapper.find('form');

        nameInput.simulate('change', { target: { value: 'My Name' } });
        form.simulate('submit');
        
        expect(mockGetItem).toHaveBeenCalledTimes(1);
        expect(mockSetItem).toHaveBeenCalledTimes(1);
    });

    it('exit from application:', () => {
        const wrapper = mount(<Router><App /></Router>);
        const nameInput = wrapper.find(Auth).find('input[type="text"]');
        const form = wrapper.find('form');

        nameInput.simulate('change', { target: { value: 'My Name' } });
        form.simulate('submit');

        const buttonExit = wrapper.find('button[name="exit"]');

        buttonExit.simulate('click');
        expect(mockRemoveItem).toHaveBeenCalledTimes(1);
        expect(mockRemoveItem).toHaveBeenCalledWith('user');
    });
});
