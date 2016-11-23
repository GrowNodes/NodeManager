import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import NodesIndex from './components/nodes_index';
import NodeNew from './components/node_new';
import NodeShow from './containers/node_show';

import {checkAuthIfNeeded} from './actions/auth/check_auth';
import SignIn from './containers/auth/signin';
import SignOut from './containers/auth/signout';

import {SET_REDIRECT_ON_AUTH} from './actions/auth/types'

export default function(store) {
    function setRedirect(path) {
        store.dispatch({ type: SET_REDIRECT_ON_AUTH, payload: path })
    }

    function authenticate (nextState, replaceState) {
        const authed = store.getState().auth.authenticated;
        if ( !authed ) {
            setRedirect(nextState.location.pathname);
            replaceState({
                pathname: '/sign_in'
            });
        }
    }

    function check_auth(nextState, replaceState, callback) {
        store.dispatch(checkAuthIfNeeded()).then(() => {
            callback();
        });
    }

	return(
	    <Route path="/" component={App} onEnter={check_auth}>
	        <IndexRoute component={NodesIndex} />
	        <Route path="nodes/new" component={NodeNew} />
	        <Route path="nodes/:node_id" component={NodeShow} onEnter={authenticate}/>
            <Route path='sign_in' component={SignIn} />
	    </Route>
    )
};
