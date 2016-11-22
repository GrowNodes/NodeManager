import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import * as Actions from '../actions';
import GrowScheduleEditor from '../components/GrowScheduleEditor';
import Moment from 'react-moment';
import TimeAgo from 'react-timeago'

class NodesShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        console.log("calling connect action");
        this.props.actions.mqttConnect(this.props.params.node_id)
    }

    renderLastSeen() {
        if (this.props.mqtt["last_seen"]) {
            return <TimeAgo date={new Date(this.props.mqtt["last_seen"]*1000)} />
        }
        return null;
    }

    
    render () {
        return (
            <div>
                <h1>Grow Node {this.props.params.node_id}</h1>
                <p>
                    Nickname: {this.props.mqtt["$name"]}<br/>
                    Online? {this.props.mqtt["$online"]}<br/>
                    Last Seen: {this.renderLastSeen()}
                </p>
                <h2>System Information</h2>
                <p>
                    Framework Version: {this.props.mqtt["$homie"]}<br/>
                    Firmware: {this.props.mqtt["$fw/name"]}<br/>
                    Version: {this.props.mqtt["$fw/version"]}<br/>
                    Checksum: {this.props.mqtt["$fw/checksum"]}<br/>
                    OTA Enabled: {this.props.mqtt["$implementation/ota/enabled"]}
                </p>
                <h2>WiFi Information</h2>
                <p>
                    Wifi Signal Strength: {this.props.mqtt["$stats/signal"]}<br/>
                    MAC Address: {this.props.mqtt["$mac"]}<br/>
                    Local IP Address: {this.props.mqtt["$localip"]}
                </p>
                <h2>Grow Schedule</h2>
                <GrowScheduleEditor grow_schedule={this.props.mqtt.grow_schedule}/>
            </div>
        );
    }
}

function mapStateToProps (state) {
    console.log(state.mqtt);
    return { mqtt: state.mqtt}
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NodesShow);