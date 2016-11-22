import * as MQTT_ACTION_TYPES from '../actions/types';

const INITIAL_STATE = {};



export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state;
        
        case MQTT_ACTION_TYPES.MQTT_CONNECT:
        console.log("mqtt connect dispatch");
        return {
            ...state,
            channel: action.payload
        }
        // Topic matching action names
        case "$homie":
        case "$mac":
        case "$name":
        case "$localip":
        case "$online":
        case "$fw/name":
        case "$fw/version":
        case "$fw/checksum":
        case "$implementation/ota/enabled":
        case "$stats/signal":
            var message = action.payload.message
            var serial = action.payload.serial
            return {
                ...state,
                [serial]: {
                    ...state[serial],
                    [action.type]: message,
                    last_seen: Math.floor((new Date).getTime() / 1000)
                }
            }
        case "$implementation/config":
            var serial = action.payload.serial
            var config = JSON.parse(action.payload.message);
            var grow_schedule = JSON.parse(config.settings.schedule);
            return {
                ...state,
                [serial]: {
                    ...state[serial],
                    [action.type]: config,
                    grow_schedule: grow_schedule,
                    last_seen: Math.floor((new Date).getTime() / 1000)
                }
            }
    }
}
