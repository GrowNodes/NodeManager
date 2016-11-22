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
            return {
                ...state,
                [action.type]: action.payload,
                last_seen: (new Date).getTime()
            }
        case "$implementation/config":
            const config = JSON.parse(action.payload);
            const grow_schedule = JSON.parse(config.settings.schedule);
            return {
                ...state,
                [action.type]: config,
                grow_schedule: grow_schedule,
                last_seen: (new Date).getTime()
            }
    }
}
