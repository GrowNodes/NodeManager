import * as MQTT_ACTION_TYPES from '../actions/types';

const INITIAL_STATE = "DISCONNECTED";



export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state;
        
        case MQTT_ACTION_TYPES.MQTT_CONNECT:
            return "CONNETED";
    
        case MQTT_ACTION_TYPES.MQTT_DISCONNECT:
            return INITIAL_STATE;
    }
}
