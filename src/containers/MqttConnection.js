import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../actions';

class MqttConnection extends Component {
    serialNumbers() {
        return ["5ccf7fd3169c"]
    }

    componentWillMount() {
        console.log("calling connect action");
        this.props.actions.mqttConnect(this.serialNumbers())
    }

    componentWillUnmount() {
        console.log("calling disconnect action");
        this.props.actions.mqttDisconnect()
    }

    render () {
        return null
    }
}

function mapStateToProps (state) {
    return { mqtt: state.mqtt}
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MqttConnection);