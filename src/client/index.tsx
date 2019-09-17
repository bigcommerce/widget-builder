import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import App from './components/App/App';
import middleware from './middleware/middleware';
import reducers from './reducers/reducers';

const store = createStore(reducers, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App store={store}/>
    </Provider>,
    document.getElementById('root'),
);
