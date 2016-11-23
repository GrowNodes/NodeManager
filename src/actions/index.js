import axios from 'axios';
import {authedApiRequest} from './api'
import { FETCHED_NODES, CREATE_NODE, FETCH_NODE, DELETE_NODE, MQTT_CONNECT, MQTT_DISCONNECT, APP_ERROR } from './types.js';

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
export function mqttConnect(topics) {
    console.log("returning connect action type")
    return {
        type: MQTT_CONNECT,
        payload: topics
    }
}

export function mqttDisconnect() {
    console.log("returning disconnect action type")
    return {
        type: MQTT_DISCONNECT
    }
}

export function fetchNodes(dispatch) {
    // const request = axios.get(`${ROOT_URL}/nodes`);

    // return {
    //     type: FETCHED_NODES,
    //     payload: request
    // };
    const request = authedApiRequest('GET', '/nodes');
    return fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(
                (result) => {
                    if (result) {
                        console.log(result)
                        var payload = {}
                        for (var i = result.length - 1; i >= 0; i--) {
                            payload[result[i]] = {}
                        }
                        dispatch({ type: FETCHED_NODES, payload });
                    } else {
                        // Auth check failed
                        dispatch({ type: APP_ERROR, payload: "error fetching nodes serials" });
                    }
                },
                (error) => {
                    dispatch({ type: APP_ERROR, payload: "error fetching nodes serials" });
                }
            );
}


export function createNode (props) {
    const request = axios.node(`${ROOT_URL}/nodes`, props);

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
    const request = axios.delete(`${ROOT_URL}/nodes/${id}`);

    return {
        type: DELETE_NODE,
        payload: request
    }
}



