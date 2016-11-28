import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import * as Actions from '../actions/grow_schedule_actions';

class GrowSchedulePicker extends Component {

	componentWillMount() {
		this.props.fetchSchedules()
	}

	renderSchedule(schedule) {
		return (
			<li>
				{schedule.meta.name}
				<pre>
					{JSON.stringify(JSON.stringify(schedule))}
				</pre>
			</li>
		)
	}

	pushSchedule(id) {
		var schedule = _.clone(this.props.schedules[id])
		delete schedule.meta
		var config = {
			"settings": {
				"schedule": JSON.stringify(schedule)
			}
		}
		console.log(JSON.stringify(config))
		// send action to create message
	}
   
    render () {
        if (this.props.schedules) {
	    	const schedules = this.props.schedules;
            return(
                <div>
                    <strong>Available schedules</strong>
                    <ul>
                        {Object.keys(schedules).map( (key) => {
                        	this.pushSchedule(key);
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

export default connect(mapStateToProps, Actions)(GrowSchedulePicker);