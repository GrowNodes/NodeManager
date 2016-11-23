import {
    AUTHED_USER,
    AUTHFAILED_USER
} from './types';

import reactCookie from 'react-cookie';
import {API_SERVER} from '../api.js';

export function checkAuthIfNeeded() {
    return (dispatch, getState) => {
        if (shouldCheckAuth(getState())) {
            return dispatch(checkAuth());
        }
        return Promise.resolve();
    }
}

function shouldCheckAuth(state) {
    const authCookie = reactCookie.load('authorization');
    const authed = state.auth.authenticated;
    if (authCookie && !authed) {
        return true;
    }
    return false;
}


function checkAuth() {
    return (dispatch) => {
        const authCookie = reactCookie.load('authorization');

        const request = new Request(`${API_SERVER}/check_auth.json`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Authorization' : authCookie
            })
        });

        return fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(
                (result) => {
                    const payload = { authorization: authCookie, name: result.name, role: result.role }
                    dispatch({ type: AUTHED_USER, payload: payload });
                },
                (error) => {
                    reactCookie.remove('authorization');
                    dispatch({ type: AUTHFAILED_USER, payload: error });
                }
            );
    }
}
