import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import NodesListItem from '../components/NodesListItem'

class NodesList extends Component {
    renderNodesListItems() {
        const nodes = this.props.nodes;
        return Object.keys(nodes).map((key, index) => {
           return <NodesListItem node={nodes[key]} serial={key} key={key}/>
        });
    }


    render() {
        if (this.props.nodes && this.props.authenticated) {
            return(
                <div>
                    <Link to="/">Home</Link><br/>
                    <strong>My Grow Nodes</strong>
                    <ul>
                        {this.renderNodesListItems()}
                    </ul>
                    <Link to="/nodes/new">Add a new node</Link><br/>
                </div>
            )
        } else {
            return null;
        }
    }
}

function mapStateToProps (state) {
    return { nodes: state.nodes, authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps, null)(NodesList);