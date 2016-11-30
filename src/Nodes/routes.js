import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {authenticate} from '../Auth/auth'

import NodesList from './containers/NodesList'
import NodeNew from './containers/NodeNew';
import NodeShowPage from './containers/NodeShowPage';
import NodeSysinfo from './containers/NodeSysinfo';


export default function(store) {
	return (
		<Route>
			<Route path="nodes" component={NodesList} onEnter={authenticate(store)}/>
			<Route path="nodes/new" component={NodeNew} onEnter={authenticate(store)}/>
			<Route path="nodes/:node_id" component={NodeShowPage} onEnter={authenticate(store)}/>
			<Route path="nodes/:node_id/sysinfo" component={NodeSysinfo} onEnter={authenticate(store)}/>
		</Route>
	)
}