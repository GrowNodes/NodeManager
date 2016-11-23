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
        const emailCookie = reactCookie.load('email');

        const request = new Request(`${API_SERVER}/secured`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+authCookie
            })
        });

        return fetch(request)
            .then((response) => {
                return response;
            })
            .then(
                (result) => {
                    if (result.ok) {
                        // Auth check success
                        const payload = { auth_token: authCookie, email: emailCookie }
                        dispatch({ type: AUTHED_USER, payload: payload });
                    } else {
                        // Auth check failed
                        reactCookie.remove('authorization');
                        reactCookie.remove('email');
                        dispatch({ type: AUTHFAILED_USER, payload: 401 });
                    }
                },
                (error) => {
                    reactCookie.remove('authorization');
                    reactCookie.remove('email');
                    dispatch({ type: AUTHFAILED_USER, payload: error });
                }
            );
    }
}
