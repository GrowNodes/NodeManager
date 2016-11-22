import { FETCH_NODES, FETCH_NODE } from '../actions/types';

const INITIAL_STATE = { all: [], node: null };



export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state;

        case FETCH_NODES:
            return { ...state, all: action.payload.data }

        case FETCH_NODE:
            return {...state, node: action.payload}
    }
}
