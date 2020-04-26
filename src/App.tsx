import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import { Game } from './components/Game';

interface AppProps {}

export const App: React.FC<AppProps> = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <p>Page</p>}/>
      <Route path="/game" render={() => <Game />}/>
    </Switch>
  </Router>
);
