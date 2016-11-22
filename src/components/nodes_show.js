import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import * as Actions from '../actions';


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
            <ul>
<li>$online: {this.props.mqtt["$online"]}</li>
<li>$homie: {this.props.mqtt["$homie"]}</li>
<li>$mac: {this.props.mqtt["$mac"]}</li>
<li>$name: {this.props.mqtt["$name"]}</li>
<li>$localip: {this.props.mqtt["$localip"]}</li>
<li>$fw/name: {this.props.mqtt["$fw/name"]}</li>
<li>$fw/version: {this.props.mqtt["$fw/version"]}</li>
<li>$fw/checksum: {this.props.mqtt["$fw/checksum"]}</li>
<li>$implementation/config: {this.props.mqtt["$implementation/config"]}</li>
<li>$implementation/ota/enabled: {this.props.mqtt["$implementation/ota/enabled"]}</li>
<li>$stats/signal: {this.props.mqtt["$stats/signal"]}</li>
            </ul>
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