import {
    AUTHED_USER,
    AUTHFAILED_USER
} from './types';

import {API_SERVER} from '../api.js';

import { browserHistory } from 'react-router';
import reactCookie from 'react-cookie';


export function signinUser({email, password}) {
    return (dispatch, getState) => {
        const successPath = getState().auth.successPath;

        const request = new Request(`${API_SERVER}/authenticate`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type' : 'application/json'}),
            body: JSON.stringify({email, password})
        });

        return fetch(request)
            .then((response) => {
                if (response.status == 401) {
                    dispatch({ type: AUTHFAILED_USER, payload: "Incorrect email or password" })
                    return null;
                }
                if(response.status == 200) {
                    return response.json();
                }
                dispatch({ type: AUTHFAILED_USER, payload: "Server Error" });
                return null;
            })
            .then(
                (result) => {
                    if (result) {
                        reactCookie.save('authorization', result.auth_token, { path: '/' });
                        dispatch({ type: AUTHED_USER, payload: result });
                        if (successPath) {
                            browserHistory.push(successPath);
                        } else {
                            browserHistory.push('/');
                        };
                    };
                }
            );
    }
}