import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

import NodesList from '../containers/NodesList'

class Navbar extends Component {
    render() {
        return (
            <div>
                <Link to="">Home</Link>
                <NodesList />
            </div>
        )
    }
}

export default Navbar;