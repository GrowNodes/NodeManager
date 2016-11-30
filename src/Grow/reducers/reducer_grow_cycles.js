import * as GC_ACTION_TYPES from '../actions/types';

const INITIAL_STATE = {};



export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state;
        case GC_ACTION_TYPES.CYCLE_CREATED:
        case GC_ACTION_TYPES.CYCLE_FETCHED:
            return {
            	...state,
            	[action.payload.node_serial]: {...action.payload, status: "fetched"},
            }
		case GC_ACTION_TYPES.CYCLE_CREATEING:
		case GC_ACTION_TYPES.CYCLE_FETCHING:
			return {
            	...state,
            	[action.node_id]: {...state[action.node_id], status: "fetching"},
            }
    }
}
