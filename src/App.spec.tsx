import React from 'react';
import { mount } from 'enzyme';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';

import { App } from './App';
import { Auth } from './components/Auth';
import { Button } from './components/GameLife/components/components/Button';
import { store, GetItemType, SetItemType, RemoveItemType } from '@shared/storage/sessionStorage';

describe('Тесты App:', () => {
    let tmpGetItem: GetItemType;
    let tmpSetItem: SetItemType;
    let tmpRomoveItem: RemoveItemType;
    const mockSetItem = jest.fn();
    const mockRemoveItem = jest.fn();
    const mockGetItem = jest.fn();
    // const sessionStorageMock = {
        // removeItem: mockRemoveItem,
        // setItem: mockSetItem,
        // getItem: mockGetItem
    // };

    // Object.defineProperty(window, 'sessionStorage', {
        // value: sessionStorageMock
    // });

    beforeEach(() => {
        tmpGetItem = store.getItem;
        tmpSetItem = store.setItem;
        tmpRomoveItem = store.removeItem;
        store.getItem = mockGetItem;
        store.setItem = mockSetItem;
        mockSetItem.mockReturnValue(Promise.resolve(true));
        store.removeItem = mockRemoveItem;
        mockRemoveItem.mockReturnValue(Promise.resolve(true));
    });

    afterEach(() => {
        mockSetItem.mockReset();
        mockGetItem.mockReset();
        mockRemoveItem.mockReset();
        store.getItem = tmpGetItem;
        store.setItem = tmpSetItem;
        store.removeItem = tmpRomoveItem;
    });

    it('написать текст в поле "Введите ваше имя":', async () => {
        mockGetItem.mockReturnValue(Promise.resolve(''));
        let wrapper;

        await act(async () => {
            wrapper = renderer.create(<Router><App /></Router>);
        });

        const nameInput = wrapper.root.findByType(Auth).findAllByType('input')[0];
            
        await act(async () => {
            nameInput.props.onChange({ target: { value: 'My Name' } });
        });

        expect(wrapper.root.findByType(Auth).findAllByType('input')[0].props.value).toBe('My Name');
    });

    it('нажать кнорку "start", когда поле "Введите ваше имя" пустое:', async () => {
        mockGetItem.mockReturnValue(Promise.resolve(''));
        let wrapper;

        await act(async () => {
            wrapper = renderer.create(<Router><App /></Router>);
        });

        const form = wrapper.root.findByType(Auth).findByType('form');
        form.props.onSubmit({ preventDefault: function() {} });

        expect(wrapper.root.findByType(Auth).findAllByType('input')[0].props.value).toBe('');
    });

    it('press "start" button, then field "Введите ваше имя" is fullfilled and check if sessionstorage.setItem was called:', async () => {
        mockGetItem.mockReturnValue(Promise.resolve(''));
        let wrapper;

        await act(async () => {
            wrapper = renderer.create(<Router><App /></Router>);
        });

        const nameInput = wrapper.root.findByType(Auth).findAllByType('input')[0];
        const form = wrapper.root.findByType(Auth).findByType('form');

        await act(async () => {
            nameInput.props.onChange({ target: { value: 'My Name' } });
        });

        await act(async () => {
            form.props.onSubmit({ preventDefault: function() {} });
        });
        
        expect(mockGetItem).toHaveBeenCalledTimes(1);
        expect(mockSetItem).toHaveBeenCalledTimes(1);
    });

    it('exit from application:', async () => {
        mockGetItem.mockReturnValue(Promise.resolve(''));
        let wrapper;

        await act(async () => {
            wrapper = renderer.create(<Router><App /></Router>);
        });

        const nameInput = wrapper.root.findByType(Auth).findAllByType('input')[0];
        const form = wrapper.root.findByType(Auth).findByType('form');

        await act(async () => {
            nameInput.props.onChange({ target: { value: 'My Name' } });
        });

        await act(async () => {
            form.props.onSubmit({ preventDefault: function() {} });
        });

        const buttonExit = wrapper.root.findAllByType('button').find(item => item.props.name === 'exit');
        
        await act(async () => {
            buttonExit.props.onClick();
        });
        
        expect(mockRemoveItem).toHaveBeenCalledTimes(1);
        expect(mockRemoveItem).toHaveBeenCalledWith('user');
    });
});
