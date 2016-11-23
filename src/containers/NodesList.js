import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

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
                    <strong>Available Nodes</strong>
                    <ul>
                        {this.renderNodesListItems()}
                    </ul>
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