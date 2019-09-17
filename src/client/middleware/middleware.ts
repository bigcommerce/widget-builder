import { applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [];

middleware.push(thunk);

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger({ collapsed: true }));
}

export default composeEnhancers(
    applyMiddleware(...middleware),
);
