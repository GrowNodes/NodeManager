import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../actions';
import GrowScheduleEditor from '../components/GrowScheduleEditor';
import Moment from 'react-moment';
import TimeAgo from 'react-timeago'

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
        return <div>Connecting to {this.serialNumbers()}</div>
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