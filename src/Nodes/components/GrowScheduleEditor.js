import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes } from '../actions/nodes_actions';
import { Link } from 'react-router';
import Moment from 'react-moment';
import _ from 'lodash'

class GrowScheduleEditor extends Component {
    
    renderControls(controls) {
        return controls.map((control) => {
            return (
                    <li>
                        {control.device}<br/>
                        <pre>{JSON.stringify(control.properties)}</pre>
                    </li>
            );
        });
    }


  render() {
    if (this.props.node["$implementation/config"]) {
        return (
            <div>
                <h4>ID: {this.props.node["$implementation/config"].settings.grow_cycle_id}</h4>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
  }
}
export default GrowScheduleEditor;