import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import * as ChatActions from '../actions';


class NodesShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        console.log("calling connect action");
        this.props.actions.mqttConnect()
    }

    
    render () {
        return (
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat iure cum, minus expedita earum iusto adipisci aspernatur ea dignissimos provident! Totam nihil fuga nulla culpa optio, assumenda, doloremque quis nesciunt!
            </div>
        );
    }
}

function mapStateToProps (state) {
    return { node: state.nodes.node }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChatActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NodesShow);