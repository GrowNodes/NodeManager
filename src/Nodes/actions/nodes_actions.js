import axios from 'axios';
import {authedApiRequest, API_URL} from '../../utils/api'
import { FETCHED_NODES, CREATE_NODE, FETCH_NODE, DELETE_NODE } from './types.js';
import { APP_ERROR } from '../../App/actions/types'

const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
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
                        dispatch(mqttConnect(result));      // clean this up at some point
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


export function createNode (serial) {
    const authToken = reactCookie.load('authorization');
    const request = axios.post(`${API_URL}/nodes/${serial}/attach`, null, { headers: {'Authorization': authToken} });

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


