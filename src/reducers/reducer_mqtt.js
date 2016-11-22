import { MQTT_INCOMING, MQTT_CONNECT } from '../actions/types';

const INITIAL_STATE = { message: null};



export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state;
        
        case MQTT_CONNECT:
        console.log("mqtt connect dispatch");
        return {
            ...state
        }
        case MQTT_INCOMING:
            return { ...state, message: action.payload }
    }
}
