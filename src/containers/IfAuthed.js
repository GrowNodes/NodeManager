import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../actions';
import MqttConnection from '../containers/MqttConnection';
class ifAuthed extends Component {
    render () {

        if (this.props.authenticated && this.props.serials) {
            return(
                <div>
                    <MqttConnection serials={this.props.serials}/>
                </div>
            )
        }
        return null;
    }
}

function mapStateToProps (state) {
    const serials = Object.keys(state.nodes).length ? Object.keys(state.nodes) : null
    return { authenticated: state.auth.authenticated, serials }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ifAuthed);