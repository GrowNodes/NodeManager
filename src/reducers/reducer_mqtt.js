import * as MQTT_ACTION_TYPES from '../actions/types';

const INITIAL_STATE = "DISCONNECTED";



export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state;
        
        case MQTT_ACTION_TYPES.MQTT_CONNECT:
            return "CONNETING";

        case MQTT_ACTION_TYPES.MQTT_CONNECTED:
            return "CONNETED";
    
        case MQTT_ACTION_TYPES.MQTT_DISCONNECT:
            return "DISCONNECTING";

        case MQTT_ACTION_TYPES.MQTT_DISCONNECTED:
            console.log("mqtt disconnect dispatch");
            return INITIAL_STATE;
    }
}
