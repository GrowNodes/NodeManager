import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { fetchSchedules } from '../actions/grow_schedule_actions';
import { mqttSend } from '../../Mqtt/actions/mqtt_actions';

class GrowSchedulePicker extends Component {

	componentWillMount() {
		this.props.fetchSchedules()
	}

	renderSchedule(schedule) {
		return (
			<li onClick={this.pushSchedule.bind(this, schedule.id)}>
				{schedule.meta.name}
			</li>
		)
	}

	pushSchedule(id) {
		var id = 1
		var schedule = _.clone(this.props.schedules[id])
		delete schedule.meta
		var config = {
			"settings": {
				"schedule": JSON.stringify(schedule)
			}
		}
		const text = JSON.stringify(config)
		// send action to create message
		this.props.mqttSend("$implementation/config/set", "text")
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

export default connect(mapStateToProps, {fetchSchedules, mqttSend})(GrowSchedulePicker);