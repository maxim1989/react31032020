import React, { useCallback, useState, useEffect } from 'react';
import {
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import { css } from '@emotion/core';

import { Game } from './components/Game';
import { GameLife } from './components/GameLife';
import { Auth, SubmitType, ChangeType } from './components/Auth';
import { Button } from './components/GameLife/components/components/Button';

const headerStyle = css`
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
`;
const navStyle = css`
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
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
const headerLeftStyle = css`margin: 0; font-size: 25px`;
const userNameStyle = css`font-weight: 800`;



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
            sessionStorage.setItem('user', user);
        }
    }, [user]);
    const onExit: (e: React.MouseEvent<HTMLButtonElement>) => void = useCallback((e) => {
        setAuth(false);
        setUser('');
        sessionStorage.removeItem('user');
    }, []);

    useEffect(() => {
        const user: string = sessionStorage.getItem('user');

        if (user) {
            setAuth(true);
            setUser(user);
        }
    }, []);

    if (!auth) {
        return <Auth user={user} onChange={onChange} onSubmit={onSubmit}/>;
    }
  
    return (
        <>
            <header css={headerStyle}>
                <p css={headerLeftStyle}>Вы вошли как <span css={userNameStyle}>{user}</span>.</p>
                <Button name="exit" onClick={onExit}>Выход</Button>
            </header>
            <nav css={navStyle}>
                <NavLink exact to="/" css={gameLifeLinkStyle}>
                    Игра-жизнь
                </NavLink>
                <NavLink to="/circle-cross" css={gameLifeLinkStyle}>
                    Крестики нолики
                </NavLink>
            </nav>
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
