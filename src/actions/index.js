import axios from 'axios';

export const FETCH_NODES = 'FETCH_NODES';
export const CREATE_NODE = 'CREATE_NODE';
export const FETCH_NODE = 'FETCH_NODE';
export const DELETE_NODE = 'DELETE_NODE';

export const NEW_MQTT_MESSAGE = 'NEW_MQTT_MESSAGE';



const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=some_offensive_words'

export function receiveMessage(message) {
    console.log(message);
  return { type: NEW_MQTT_MESSAGE, payload: message };
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



