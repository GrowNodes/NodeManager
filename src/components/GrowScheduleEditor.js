import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes } from '../actions/index';
import { Link } from 'react-router';

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
                        <strong>From {timeRange.from} to {timeRange.to}</strong>
                        <ul>
                            {this.renderEnsures(timeRange.ensure)}
                        </ul>
                    </div>
            );
        });
    }



  render() {
    console.log(this.props.grow_schedule)
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