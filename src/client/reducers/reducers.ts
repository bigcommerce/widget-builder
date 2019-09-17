import { combineReducers } from 'redux';

import defaultReducer, { DefaultState } from './default';

export interface State {
    defaultState: DefaultState;
}

const reducers = combineReducers({
    defaultState: defaultReducer,
});

export default reducers;
