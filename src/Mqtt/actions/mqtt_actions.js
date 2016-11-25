import axios from 'axios';
import {authedApiRequest, API_URL} from '../../utils/api'
import { MQTT_CONNECT, MQTT_DISCONNECT } from './types.js';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api'

export function mqttIncoming(topic, message) {
    // Remove /nodes/serialnumber/ from topic
    // and then dispatch action
    const serial = topic.split('/')[1];
    var subtopic = topic.substring(topic.indexOf("/") + 1);
    var subtopic = subtopic.substring(subtopic.indexOf("/") + 1);
    // console.log(subtopic);
    // console.log(message);
  return { type: subtopic, payload: {message, serial} };
}
export function mqttConnect() {
    console.log("returning connect action type")
    return {
        type: MQTT_CONNECT
    }
}

export function mqttDisconnect() {
    console.log("returning disconnect action type")
    return {
        type: MQTT_DISCONNECT
    }
}

