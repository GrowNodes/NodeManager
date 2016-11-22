import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes } from '../actions/index';
import { Link } from 'react-router';

class NodesIndex extends Component {

    componentWillMount() {
        this.props.fetchNodes();
    }

    renderNodes() {
        return this.props.nodes.map((node) => {
            return (
                <li className="list-group-item" key={node.id}>
                    <Link to={"nodes/" + node.id}>
                        <span className="pull-xs-right">{node.categories}</span>
                        <strong>{node.title}</strong>
                    </Link>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link to="/nodes/new" className="btn btn-primary">New Node</Link>
                </div>
                <h3>All nodes</h3>
                <ul className="list-group">
                    {this.renderNodes()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {nodes: state.nodes.all };
}

// First arg is map state to props, then using shortcut for mapDispatchToNodes
export default connect(mapStateToProps, { fetchNodes })(NodesIndex);
