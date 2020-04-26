import React from 'react';
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
`;

const gameLifeLinkStyle = css`
    margin-right: 20px;
`;

interface AppProps {}

export const App: React.FC<AppProps> = () => (
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
