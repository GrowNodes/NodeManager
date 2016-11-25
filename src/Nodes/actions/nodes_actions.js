import axios from 'axios';
import {authedApiRequest, API_URL} from '../../utils/api'
import { NODES_FETCHED,
    NODES_INVALID,
    NODES_FETCHING,
    NODES_FETCH_FAILED,
    CREATE_NODE,
    FETCH_NODE,
    DELETE_NODE } from './types.js';
import { APP_ERROR } from '../../App/actions/types'

export function fetchNodes() {
    const request = authedApiRequest('GET', '/nodes');

    return (dispatch) => {
        dispatch({ type: NODES_FETCHING });
        return fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(
                (result) => {
                    var payload = {}
                    for (var i = result.length - 1; i >= 0; i--) {
                        payload[result[i]] = {}
                    }
                    dispatch({ type: NODES_FETCHED, payload })
                },
                (error) => dispatch({ type: NODES_FETCH_FAILED, error })
            );
    }
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


