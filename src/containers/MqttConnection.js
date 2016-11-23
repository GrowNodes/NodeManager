import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../actions';

class MqttConnection extends Component {

    componentWillMount() {
        console.log("calling connect action");
        this.props.actions.mqttConnect(this.props.serials)
    }

    componentWillUnmount() {
        console.log("calling disconnect action");
        this.props.actions.mqttDisconnect()
    }

    render () {
        return <div>
            {this.props.mqtt}
        </div>
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