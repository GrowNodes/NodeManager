import axios from 'axios';
import {authedApiRequest, API_URL} from '../../utils/api'
import { SCHEDULE_FETCHED,
    SCHEDULES_INVALID,
    SCHEDULES_FETCHING,
    SCHEDULES_FETCH_FAILED,
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
