import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { createGrowCycle, fetchSchedules } from '../actions/grow_schedule_actions';
import { mqttSend } from '../../Mqtt/actions/mqtt_actions';

class GrowSchedulePicker extends Component {

	componentWillMount() {
		this.props.fetchSchedules()
	}

	renderSchedule(schedule) {
		return (
			<li onClick={this.createAndPushGrowCycle.bind(this, schedule.id)}>
				{schedule.id} {schedule.name}
			</li>
		)
	}

	createAndPushGrowCycle(schedule_id) {
		this.props.createGrowCycle(schedule_id, this.props.node_id)
		.then((grow_cycle) => {
			var obj_to_push = _.clone(grow_cycle)
			obj_to_push.grow_schedule = "http://example.com"
			obj_to_push = {settings: obj_to_push}
			const text_to_push = JSON.stringify(obj_to_push)
			// send action to create message
			this.props.mqttSend(`${this.props.node_id}/$implementation/config/set`, text_to_push)
		})
	}
   
    render () {
        if (this.props.schedules) {
	    	const schedules = this.props.schedules;
            return(
                <div>
                    <strong>Available schedules</strong>
                    <ul>
                        {Object.keys(schedules).map( (key) => {
						    return this.renderSchedule(schedules[key])
						})}
                    </ul>
                </div>
            )
        } else {
            return <p>"Loading"</p>;
        }
    }
}

function mapStateToProps (state) {
    return { schedules: state.grow_schedules}
}

export default connect(mapStateToProps, {createGrowCycle, fetchSchedules, mqttSend})(GrowSchedulePicker);