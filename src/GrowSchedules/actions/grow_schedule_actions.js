import axios from 'axios';
import {authedApiRequest, API_URL} from '../../utils/api'
import { SCHEDULE_FETCHED,
    SCHEDULES_INVALID,
    SCHEDULES_FETCHING,
    SCHEDULES_FETCH_FAILED,
    CYCLE_CREATEING,
    CYCLE_CREATED,
    CYCLE_CREATE_FAILED
} from './types.js';
import { APP_ERROR } from '../../App/actions/types'

export function fetchSchedules() {
    const request = authedApiRequest('GET', '/grow_schedules');

    return (dispatch) => {
        dispatch({ type: SCHEDULES_FETCHING });
        return fetch(request)
            .then((response) => {
                return response.json();
            })
            .then(
                (result) => {
                    for (var i = result.length - 1; i >= 0; i--) {
	                    dispatch({ type: SCHEDULE_FETCHED, payload: result[i] })
                    }
                },
                (error) => dispatch({ type: SCHEDULES_FETCH_FAILED, error })
            );
    }
}


export function createGrowCycle(schedule_id, node_id) {
    console.log(schedule_id)
    const body = {"grow_cycle": {grow_schedule_id: schedule_id, node_id}}
    const request = authedApiRequest('POST', `/nodes/${node_id}/grow_cycles`, body);

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
