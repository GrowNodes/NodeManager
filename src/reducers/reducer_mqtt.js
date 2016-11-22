import { NEW_MQTT_MESSAGE } from '../actions/types';

const INITIAL_STATE = { message: null};



export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state;

        case NEW_MQTT_MESSAGE:
            return { ...state, message: action.payload }
    }
}
