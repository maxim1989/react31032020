import React from 'react';
import { mount } from 'enzyme';
import {
    BrowserRouter as Router
} from 'react-router-dom';

import { App } from './App';
import { Auth } from './components/Auth';

describe('Тесты App:', () => {
    const login = jest.fn();
    const logout = jest.fn();
    const checkoAuth = jest.fn();

    afterEach(() => {
        login.mockReset();
        logout.mockReset();
        checkoAuth.mockReset();
    });

    it('написать текст в поле "Введите ваше имя":', async () => {
        let wrapper = mount(<Router>
            <App user=""
                 auth={false}
                 login={login}
                 logout={logout}
                 checkoAuth={checkoAuth}     
            />
        </Router>);

        const nameInput = wrapper.find(Auth).find('input[type="text"]');
            
        nameInput.simulate('change', { target: { value: 'My Name' } });

        expect(wrapper.find(Auth).find('input[type="text"]').prop('value')).toBe('My Name');
        expect(checkoAuth).toHaveBeenCalledTimes(1);
    });

    it('нажать кнорку "start", когда поле "Введите ваше имя" пустое:', async () => {
        let wrapper = mount(<Router>
            <App user=""
                 auth={false}
                 login={login}
                 logout={logout}
                 checkoAuth={checkoAuth}     
            />
        </Router>);

        const form = wrapper.find(Auth).find('form');
        form.simulate('submit', { preventDefault: function() {} });

        expect(wrapper.find(Auth).find('input[type="text"]').prop('value')).toBe('');
        expect(checkoAuth).toHaveBeenCalledTimes(1);
    });

    it('press "start" button, then field "Введите ваше имя" is fullfilled and check if login was called:', async () => {
        let wrapper = mount(<Router>
            <App user=""
                 auth={false}
                 login={login}
                 logout={logout}
                 checkoAuth={checkoAuth}     
            />
        </Router>);

        const form = wrapper.find(Auth).find('form');
        const nameInput = wrapper.find(Auth).find('input[type="text"]');

        nameInput.simulate('change', { target: { value: 'My Name' } });
        form.simulate('submit', { preventDefault: function() {} });
        
        expect(checkoAuth).toHaveBeenCalledTimes(1);
        expect(login).toHaveBeenCalledTimes(1);
    });

    it('exit from application:', async () => {
        let wrapper = mount(<Router>
            <App user="test user"
                 auth={true}
                 login={login}
                 logout={logout}
                 checkoAuth={checkoAuth}     
            />
        </Router>);

        const buttonExit = wrapper.find('button[name="exit"]');
        
        buttonExit.simulate('click');
        
        expect(checkoAuth).toHaveBeenCalledTimes(1);
        expect(login).toHaveBeenCalledTimes(0);
        expect(logout).toHaveBeenCalledTimes(1);
    });
});
