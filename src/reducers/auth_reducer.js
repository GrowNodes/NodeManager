import {
    AUTHED_USER,
    AUTHFAILED_USER,
    UNAUTH_USER,
    SET_REDIRECT_ON_AUTH,
} from '../actions/auth/types';

const INITIAL_STATE = {
    user: {}
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTHED_USER:
            return {
                ...state,
                error: '',
                authenticated: true,
                user: {name: action.payload.name, role: action.payload.role},
                successPath: null
            }

        case UNAUTH_USER:
            return {
                ...state,
                error: '',
                authenticated: false,
                user: {}
            }

        case AUTHFAILED_USER:
            return {...state, error: action.payload}
            
        case SET_REDIRECT_ON_AUTH:
            return {
                ...state,
                successPath: action.payload
            }
    }

    return state;
}