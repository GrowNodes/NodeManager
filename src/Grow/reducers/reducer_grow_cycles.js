import * as GC_ACTION_TYPES from '../actions/types';

const INITIAL_STATE = {};



export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state;
        case GC_ACTION_TYPES.CYCLE_CREATED:
        case GC_ACTION_TYPES.CYCLE_FETCHED:
            return {...state, data: action.payload}
    }
}
