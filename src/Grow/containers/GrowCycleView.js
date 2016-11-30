import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Moment from 'react-moment';
import _ from 'lodash'
import { createGrowCycle, fetchGrowCycleIfNeeded } from '../actions/grow_cycle_actions';


class GrowCycleView extends Component {

    componentWillReceiveProps() {
        if (this.props.node.serial) {
            if (!this.props.grow_cycles[this.props.node.serial]) {
                    this.props.fetchGrowCycleIfNeeded(this.props.node.serial)
            }
        }
    }
   
  render() {
    if (this.props.node["$implementation/config"]) {
        const settings = this.props.node["$implementation/config"].settings
        const stored_cycle = this.props.grow_cycles[this.props.node.serial] || {}

        return (
            <div>
                Grow Cycle ID: {settings.cycle_id}<br/>
                Start at: {stored_cycle.start_at}<br/>
                Aborted?: {stored_cycle.aborted ? "true" : "false"}
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
  }
}


function mapStateToProps (state) {
    return {grow_cycles: state.grow_cycles}
}

export default connect(mapStateToProps, { createGrowCycle, fetchGrowCycleIfNeeded })(GrowCycleView);