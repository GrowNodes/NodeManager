import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as Actions from '../actions/grow_schedule_actions';

class GrowSchedulePicker extends Component {

	componentWillMount() {
		this.props.fetchSchedules()
	}

   
    render () {
        if (this.props.schedules) {
	    	const schedules = this.props.schedules;
            return(
                <div>
                    <strong>Available schedules</strong>
                    <ul>
                        {Object.keys(schedules).map(function(key) {
						    return <li>{schedules[key].meta.name}</li>;
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