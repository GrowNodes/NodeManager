import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as Actions from '../actions/nodes_actions';
import GrowCycleView from '../../Grow/containers/GrowCycleView';
import GrowCycleCreator from '../../Grow/containers/GrowCycleCreator';
import Moment from 'react-moment';
import TimeAgo from 'react-timeago'

class NodesShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    renderLastSeen() {
        const node = this.props.nodes[this.props.params.node_id];
        if (node["last_seen"]) {
            return <TimeAgo date={new Date(node["last_seen"]*1000)} />
        }
        return null;
    }

    
    render () {
        const node = this.props.nodes[this.props.params.node_id];
        if (!node) {
            return <div>"not found"</div>
        }
        return (
            <div>
                <Link to="/nodes">Back to Nodes</Link><br/>
                <h1>Grow Node {this.props.params.node_id}</h1>
                <p>
                    Nickname: {node["$name"]}<br/>
                    Online? {node["$online"]}<br/>
                    Last Seen: {this.renderLastSeen()}
                </p>
                <p>
                    <Link to={`/nodes/${this.props.params.node_id}/sysinfo`}>System Information</Link><br/>
                </p>
                <h2>Grow Cycle</h2>
                <GrowCycleView node={node}/>
                <GrowCycleCreator node_id={this.props.params.node_id}/>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return { nodes: state.nodes}
}

export default connect(mapStateToProps, null)(NodesShow);