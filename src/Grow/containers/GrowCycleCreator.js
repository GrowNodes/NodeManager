import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class GrowCycleCreator extends Component {
	formatGrowCycle(cylce_obj) {
	    var obj_to_push = _.clone(cylce_obj)
	    
	    for (var i = obj_to_push.plant_stages.length - 1; i >= 0; i--) {
	        var new_stage = {}
	        new_stage.from_rel = obj_to_push.plant_stages[i].from_rel
	        new_stage.to_rel = obj_to_push.plant_stages[i].to_rel
	        new_stage.light_on_at = obj_to_push.plant_stages[i].light_on_at
	        new_stage.light_off_at = obj_to_push.plant_stages[i].light_off_at
	        new_stage.air_temp_high = obj_to_push.plant_stages[i].air_temp_high
	        new_stage.air_temp_low = obj_to_push.plant_stages[i].air_temp_low
	        obj_to_push.plant_stages[i] = new_stage
	    }

	    obj_to_push.plant_stages = JSON.stringify(obj_to_push.plant_stages)

	    obj_to_push.cycle_id = obj_to_push.id
	    delete obj_to_push.id
	    obj_to_push = {settings: obj_to_push}

	    const text_to_push = JSON.stringify(obj_to_push)
	    return text_to_push 
	}
	   
    render () {
        if (this.props.grow_cycles[this.props.node_id] && this.props.grow_cycles[this.props.node_id].status == "fetched") {
            return(
                <div>
                Creator:
                <pre>
                	{this.formatGrowCycle(this.props.grow_cycles[this.props.node_id])}
                </pre>
                </div>
            )
        } else {
            return <p>"Loading"</p>;
        }
    }
}

function mapStateToProps (state) {
    return { grow_cycles: state.grow_cycles}
}

export default connect(mapStateToProps, null)(GrowCycleCreator);