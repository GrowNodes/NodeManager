import axios from 'axios';
import {authedApiRequest, API_URL} from '../../utils/api'
import {
    CYCLE_CREATEING,
    CYCLE_CREATED,
    CYCLE_CREATE_FAILED,
    CYCLE_FETCHED,
    CYCLE_FETCHING,
    CYCLE_FETCH_FAILED
} from './types.js';
import { APP_ERROR } from '../../App/actions/types'



export function createGrowCycle(schedule_id, node_id) {
    const start_at = new Date().toISOString()
    const body = {"grow_cycle": {grow_schedule_id: schedule_id, node_id, start_at}}
    const request = authedApiRequest('POST', `/nodes/${node_id}/grow_cycles`, JSON.stringify(body));

    return (dispatch) => {
        dispatch({ type: CYCLE_CREATEING });
        return fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(
                (result) => {
                    dispatch({ type: CYCLE_CREATED, payload: result })
                    return result
                },
                (error) => dispatch({ type: CYCLE_CREATE_FAILED, error })
            );
    }
}


export function fetchGrowCycle(node_id) {
    const request = authedApiRequest('GET', `/nodes/${node_id}/grow_cycles`);

    return (dispatch) => {
        dispatch({ type: CYCLE_FETCHING });
        return fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(
                (result) => {
                    dispatch({ type: CYCLE_FETCHED, payload: result })
                    return result
                },
                (error) => dispatch({ type: CYCLE_FETCH_FAILED, error })
            );
    }
}