import { MQTT_CONNECT } from '../actions/types';

const INITIAL_STATE = { message: [], channel: null};



export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state;
        
        case MQTT_CONNECT:
        console.log("mqtt connect dispatch");
        return {
            ...state,
            channel: action.payload
        }
        case "asdf":
            return {
                ...state,
                message: [...state.message, action.payload]
            }
    }
}
