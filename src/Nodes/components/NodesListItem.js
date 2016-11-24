import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes } from '../actions/nodes_actions';

import { Link } from 'react-router';
import Moment from 'react-moment';

class NodesListItem extends Component {
    
    render() {
        return(
            <li>
                <Link to={`/nodes/${this.props.serial}`}>{this.props.serial}</Link>
            </li>
        );
    }
}
export default NodesListItem;