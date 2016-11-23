import {
    AUTHING_USER,
    AUTHED_USER,
    AUTHFAILED_USER
} from './types';
import {API_SERVER, apiCall} from '../api.js';

import reactCookie from 'react-cookie';




export function signupUser({email, password}) {

    return function(dispatch) {     //redux thunk allows us to return a function instead of an object from an action creator
        // Submit email/pass to server
        axios.post(`${API_SERVER}/users.json`, {user: {email, password}})
            .then(response => {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.authorization);
                browserHistory.push('/gigs');
            })
            .catch(response => {
                dispatch(authError(response.data));
            });
    }
}


export function signoutUser() {
    localStorage.removeItem('token');
    return {type: UNAUTH_USER}
}
