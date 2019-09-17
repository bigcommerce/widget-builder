import { Action } from '../actions/action';
import { defaultActionTypes } from '../actions/default';

export interface DefaultState {
    title: string;
}

export const defaultState: DefaultState = {
    title: 'Default Title',
};

function defaultReducer(state: DefaultState = defaultState, action: Action): DefaultState {
    if (action.error) {
        return state;
    }

    switch (action.type) {
        case defaultActionTypes.GET_TITLE:
            return {
                ...state,
                ...{ title: action.payload },
            };
        default:
            return state;
    }
}

export default defaultReducer;
