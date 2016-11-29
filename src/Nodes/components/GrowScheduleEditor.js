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


    renderPeriods() {
        if (_.isEmpty(this.props.node.grow_schedule)) {
            return <strong>No grow schedule loaded.</strong>
        } else {
            console.log(this.props.node.grow_schedule)
            return this.props.node.grow_schedule.map((period) => {
                return (
                        <div>
                            For {period.name} from <Moment unix>{period.from_rel}</Moment> to <Moment unix>{period.to_rel}</Moment> 
                            <ul>
                                {this.renderControls(period.controls)}
                            </ul>
                        </div>
                );
            });
        }
    }



  render() {
    if (this.props.node["$implementation/config"]) {
        return (
            <div>
                <h4>ID: {this.props.node["$implementation/config"].settings.grow_cycle_id}</h4>
                {this.renderPeriods()}
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
  }
}
export default GrowScheduleEditor;