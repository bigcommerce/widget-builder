import { combineReducers } from 'redux';

import exampleReducer, { ExampleState } from './example';

export interface State {
    exampleState: ExampleState;
}

const reducers = combineReducers({
    exampleState: exampleReducer,
});

export default reducers;
