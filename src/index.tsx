import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import { createStore } from './store';

const store = createStore();

export type RootState = ReturnType<typeof store.getState>

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
document.getElementById('root'));
