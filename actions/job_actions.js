import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
// qs module is to form a search string with key=val pairs
import qs from 'qs';

import {
    FETCH_JOBS,
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL = 'https://jobs.github.com/positions.json?'

// Thanks to redux-thunk, we got dispatch func. as parameter 
/* export const fetchJobs = () => {
    return async function(dispatch) {

    }
}; */

const buildJobsUrl = ({ longitude, latitude }) => {
    const query = qs.stringify({ longitude: longitude, latitude: latitude, full_time: false });
    return `${JOB_ROOT_URL}${query}`;
};

// Instead of fetchJobs above func definition, we can use arrow functions as below
export const fetchJobs = (region, callback) => async (dispatch) => {
    try {
        //let zip = await reverseGeocode(region);
        const url = buildJobsUrl(region);
        console.log('URL ', url);
        // axios ile ilgili bir sorun var
        let result  = await axios.get(url);
        const data = result.data.slice(0, 4);
        console.log("DATA ", data);
        dispatch({ type: FETCH_JOBS, payload: data });
        callback();
    } catch (error) {
        console.log(error);
    }

};

export const likeJobs = (job) => {
    return {
        payload: job,
        type: LIKE_JOB
    };
};

export const clearLikedJobs = () => {
    return { type: CLEAR_LIKED_JOBS }
};