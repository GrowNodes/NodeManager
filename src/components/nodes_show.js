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
        this.props.actions.mqttConnect(this.props.params.node_id)
    }

    
    render () {
        return (
            <p>
                {this.props.message}
            </p>
        );
    }
}

function mapStateToProps (state) {
    console.log(state.mqtt);
    return { message: state.mqtt.message }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChatActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NodesShow);