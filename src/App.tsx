import React, { useCallback, useState, SetStateAction } from 'react';
import {
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import { css } from '@emotion/core';

import { Game } from './components/Game';
import { GameLife } from './components/GameLife';

const headerStyle = css`
    margin-bottom: 20px;
    background-color: yellow;
`;

const gameLifeLinkStyle = css`
    margin-right: 20px;
`;

interface AppProps {}

export const App: React.FC<AppProps> = () => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState('');
    const onChange = useCallback((e) => {
      setUser(e.target.value);
    }, []);
    const onSubmit = useCallback((e) => {
        e.preventDefault();

        if (e.target[0].value) {
            setAuth(true);
        }
    }, []);

    if (!auth) {
        return (
            <div css={css({
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            })}>
                <form onSubmit={onSubmit}>
                    <label>
                        <p css={css({
                          height: '100%',
                          width: '100%'
                        })}>
                            Введите ваше имя
                        </p>
                        <input type="text" value={user} onChange={onChange} required/>
                        <input type="submit"/>
                    </label>
                </form>
            </div>
        );
    }
  
    return (
        <>
          <header css={headerStyle}>
              <NavLink exact to="/" activeStyle={{ color: 'red', fontWeight: 'bold' }} css={gameLifeLinkStyle}>
                  Игра-жизнь
              </NavLink>
              <NavLink to="/circle-cross" activeStyle={{ color: 'red', fontWeight: 'bold' }} >
                  Крестики нолики
              </NavLink>
            </header>
            <Switch>
                <Route exact path="/" render={() => <GameLife />} />
                <Route path="/circle-cross" render={() => <Game />} />
            </Switch>
        </>
    );
};
