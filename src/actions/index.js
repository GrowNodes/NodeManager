import axios from 'axios';

import { MQTT_INCOMING, FETCH_NODES, CREATE_NODE, FETCH_NODE, DELETE_NODE, MQTT_CONNECT } from './types.js';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=some_offensive_words'

export function receiveMessage(message) {
    console.log(message);
  return { type: MQTT_INCOMING, payload: message };
}
export function mqttConnect(topic) {
    console.log("returning connect action type")
    return {
        type: MQTT_CONNECT,
        payload: topic
    }
}

export function fetchNodes() {
    const request = axios.get(`${ROOT_URL}/nodes${API_KEY}`);

    return {
        type: FETCH_NODES,
        payload: request
    };
}


export function createNode (props) {
    const request = axios.node(`${ROOT_URL}/nodes${API_KEY}`, props);

    return {
        type: CREATE_NODE,
        payload: request
    }
}

export function fetchNode(id) {
    // Create a client instance
    return {
        type: FETCH_NODE,
        payload: "some request payload here"
    }
}


export function deleteNode(id) {
    const request = axios.delete(`${ROOT_URL}/nodes/${id}${API_KEY}`);

    return {
        type: DELETE_NODE,
        payload: request
    }
}



