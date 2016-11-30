import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App/app';
import MainNav from './Nav/containers/MainNav'
import {authenticate, check_auth} from './Auth/auth'
import NodesRoutes from './Nodes/routes'
import UserSettings from './UserSettings/components/UserSettings';
import SignIn from './Auth/containers/sign_in';
import SignOut from './Auth/containers/sign_out';

import {SET_REDIRECT_ON_AUTH} from './Auth/actions/types'

export default function(store) {
	return(
	    <Route path="/" component={App} onEnter={check_auth(store)}>
	        <IndexRoute component={MainNav} onEnter={authenticate(store)}/>
            {NodesRoutes(store)}
            <Route path="settings" component={UserSettings} onEnter={authenticate(store)} />
            <Route path='sign_in' component={SignIn} />
            <Route path='sign_out' component={SignOut} />
	    </Route>
    )
};
