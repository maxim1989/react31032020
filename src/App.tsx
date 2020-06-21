import React, { useCallback, useState, useEffect } from 'react';
import {
  Switch,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom';
import { css } from '@emotion/core';
import { connect } from 'react-redux';

import { login, logout, checkoAuth } from './__data__/actions';
import { RootState } from '.';

import { Game } from './components/Game';
import { GameLife } from './components/GameLife';
import { LessonSeventeenConnector } from './lesson-17/homework/LessonSeventeen';
import { Auth, SubmitType, ChangeType } from './components/Auth';
import { Button } from './components/GameLife/components/components/Button';
import { loginRequired } from '@shared/HOC/LoginRequired';

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



interface AppProps {
    auth: boolean,
    user: string,
    login: Function,
    logout: Function,
    checkoAuth: Function
}

export const App: React.FC<AppProps> = (props) => {
    const { auth, user } = props;
    const [userInput, setUserInput] = useState('');
    const onChange: ChangeType = useCallback((e) => {
        setUserInput(e.target.value);
    }, []);
    const onSubmit: SubmitType = useCallback((e) => {
        e.preventDefault();
        
        if (userInput) {
            const { login } = props;

            login(userInput);
        }
    }, [userInput]);
    const onExit: (e: React.MouseEvent<HTMLButtonElement>) => void = useCallback((e) => {
        const { logout } = props;

        logout();
    }, []);

    useEffect(() => {
        const { checkoAuth } = props;

        checkoAuth();
    }, []);
  
    return (
        <>
            {auth && <header css={headerStyle}>
                <p css={headerLeftStyle}>Вы вошли как <span css={userNameStyle}>{user}</span>.</p>
                <Button name="exit" onClick={onExit}>Выход</Button>
            </header>}
            <nav css={navStyle}>
                <NavLink exact to="/" css={gameLifeLinkStyle}>
                    Игра-жизнь
                </NavLink>
                <NavLink to="/circle-cross" css={gameLifeLinkStyle}>
                    Крестики нолики
                </NavLink>
                <NavLink to="/lessonSeventeen" css={gameLifeLinkStyle}>
                    lesson-17
                </NavLink>
            </nav>
            <Switch>
                <Route exact path="/" component={loginRequired(GameLife, auth)} />
                <Route path="/circle-cross">
                    <Game />
                </Route>
                <Route path="/lessonSeventeen">
                    <LessonSeventeenConnector />
                </Route>
                <Route path="/login">
                    {auth ? <Redirect to="/"/>: <Auth user={userInput} onChange={onChange} onSubmit={onSubmit}/>}
                </Route>
            </Switch>
        </>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        auth: state.authication.auth,
        user: state.authication.user
    };
};

const mapDispatchToProps = {
    login, logout, checkoAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
