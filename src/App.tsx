import React, { useCallback, useState } from 'react';
import {
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import { css } from '@emotion/core';

import { Game } from './components/Game';
import { GameLife } from './components/GameLife';
import { Auth, SubmitType, ChangeType } from './components/Auth';

const headerStyle = css`
    margin-bottom: 20px;
    background-color: yellow;
`;

const gameLifeLinkStyle = css`
    margin-right: 20px;

    &:last-child {
        margin-right: 0;
    };

    &.active {
        color: red;
        font-weight: bold;
    };
`;

interface AppProps {}

export const App: React.FC<AppProps> = () => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState('');
    const onChange: ChangeType = useCallback((e) => {
      setUser(e.target.value);
    }, []);
    const onSubmit: SubmitType = useCallback((e) => {
        e.preventDefault();

        if (user) {
            setAuth(true);
        }
    }, [user]);

    if (!auth) {
        return <Auth user={user} onChange={onChange} onSubmit={onSubmit}/>;
    }
  
    return (
        <>
          <header css={headerStyle}>
              <p css={css`margin: 0;`}>Вы вошли как {user}.</p>
              <NavLink exact to="/" css={gameLifeLinkStyle}>
                  Игра-жизнь
              </NavLink>
              <NavLink to="/circle-cross" css={gameLifeLinkStyle}>
                  Крестики нолики
              </NavLink>
            </header>
            <Switch>
                <Route exact path="/">
                    <GameLife />
                </Route>
                <Route path="/circle-cross">
                    <Game />
                </Route>
            </Switch>
        </>
    );
};
