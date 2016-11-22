import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes } from '../actions/index';
import { Link } from 'react-router';
import Moment from 'react-moment';

class GrowScheduleEditor extends Component {
    
    renderEnsures(ensures) {
        return ensures.map((ensure) => {
            return (
                    <li>
                        <strong>{ensure.control}</strong> params {JSON.stringify(ensure.params)}
                    </li>
            );
        });
    }


    renderTimeRanges() {
        return this.props.grow_schedule.map((timeRange) => {
            return (
                    <div>
                        <strong>
                            From <Moment unix>{timeRange.from}</Moment> to <Moment unix>{timeRange.to}</Moment> 
                        </strong>
                        <ul>
                            {this.renderEnsures(timeRange.ensure)}
                        </ul>
                    </div>
            );
        });
    }



  render() {
    if (this.props.grow_schedule) {
        return (
            <div>
                {this.renderTimeRanges()}
            </div>
        );
    } else {
        return null;
    }
  }
}
export default GrowScheduleEditor;