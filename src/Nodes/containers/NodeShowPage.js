import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as Actions from '../actions/nodes_actions';
import GrowScheduleEditor from '../components/GrowScheduleEditor';
import GrowSchedulePicker from '../../GrowSchedules/containers/GrowSchedulePicker';
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
                <h2>System Information</h2>
                <p>
                    Framework Version: {node["$homie"]}<br/>
                    Firmware: {node["$fw/name"]}<br/>
                    Version: {node["$fw/version"]}<br/>
                    Checksum: {node["$fw/checksum"]}<br/>
                    OTA Enabled: {node["$implementation/ota/enabled"]}
                </p>
                <h2>WiFi Information</h2>
                <p>
                    Saved access point SSID: {node["$implementation/config"] ? node["$implementation/config"].wifi.ssid : null}<br/>
                    Wifi Signal Strength: {node["$stats/signal"]}<br/>
                    MAC Address: {node["$mac"]}<br/>
                    Local IP Address: {node["$localip"]}
                </p>
                <h2>Grow Schedule</h2>
                <GrowScheduleEditor grow_schedule={node.grow_schedule}/>
                <GrowSchedulePicker node_id={this.props.params.node_id}/>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return { nodes: state.nodes}
}

export default connect(mapStateToProps, null)(NodesShow);