import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { fetchSchedules } from '../actions/grow_schedule_actions';
import { createGrowCycle } from '../actions/grow_cycle_actions';

class GrowCycleCreator extends Component {

	componentWillMount() {
		this.props.fetchSchedules()
	}

	renderSchedule(schedule) {
		return (
			<li onClick={this.createCycle.bind(this, schedule.id)}>
				{schedule.name}
			</li>
		)
	}

	createCycle(schedule_id) {
		this.props.createGrowCycle(schedule_id, this.props.node_id)
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

export default connect(mapStateToProps, {fetchSchedules, createGrowCycle})(GrowCycleCreator);