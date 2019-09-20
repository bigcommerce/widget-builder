import { Dispatch } from 'redux';

import * as api from '../services/api';

export enum defaultActionTypes {
    'GET_TITLE' = 'GET_TITLE',
}

export function titleResponse(
    payload: string,
    error: boolean = false,
) {
    return {
        error,
        payload,
        type: defaultActionTypes.GET_TITLE,
    };
}

export function getTitle() {
    return (dispatch: Dispatch) => api.getTitle()
        .then(data => dispatch(titleResponse(data)))
        .catch(error => console.log('error', error));
}
