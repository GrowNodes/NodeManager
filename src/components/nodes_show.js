import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchNode, deleteNode } from '../actions/index';


class NodesShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        this.props.fetchNode(this.props.params.node_id);
    }

    onDeleteClick() {
        this.props.deleteNode(this.props.params.node_id)
            .then(() => {
                this.context.router.push('/');
            });
    }

    render () {
        const {node} = this.props;

        if (!node) {
            return <div>Loading...</div>
        };
        return (
            <div>
                <Link to="/" className="btn btn-primary">Back to index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>Delete</button>
                <h3>{node.title}</h3>
                <h6>Categories: {node.categories}</h6>
                <p>{node.content}</p>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return { node: state.nodes.node }
}

export default connect(mapStateToProps, { fetchNode, deleteNode })(NodesShow);
