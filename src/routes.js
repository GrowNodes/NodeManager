import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import NodesIndex from './components/nodes_index';
import NodesNew from './components/nodes_new';
import NodeShow from './containers/node_show';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={NodesIndex} />
        <Route path="nodes/new" component={NodesNew} />
        <Route path="nodes/:node_id" component={NodeShow} />
    </Route>
);
