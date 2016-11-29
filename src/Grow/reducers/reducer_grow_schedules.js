import * as GS_ACTION_TYPES from '../actions/types';

const INITIAL_STATE = {};



export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state;
        case GS_ACTION_TYPES.SCHEDULE_FETCHED:
            return {...state, [action.payload.id]: action.payload}
    }
}
