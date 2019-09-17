import { Action } from '../actions/action';
import { exampleActionTypes } from '../actions/example';

export interface ExampleState {
    title: string;
}

export const exampleState: ExampleState = {
    title: 'Default Title',
};

function exampleReducer(state: ExampleState = exampleState, action: Action): ExampleState {
    if (action.error) {
        return state;
    }

    switch (action.type) {
        case exampleActionTypes.GET_TITLE:
            return {
                ...state,
                ...{ title: action.payload },
            };
        default:
            return state;
    }
}

export default exampleReducer;
