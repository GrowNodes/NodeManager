import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNodes } from '../actions/nodes_actions';
import { Link } from 'react-router';
import Moment from 'react-moment';
import _ from 'lodash'

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
        if (_.isEmpty(this.props.grow_schedule)) {
            return <strong>No grow schedule loaded.</strong>
        } else {
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
    }



  render() {
    if (this.props.grow_schedule) {
        return (
            <div>
                {this.renderTimeRanges()}
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
  }
}
export default GrowScheduleEditor;