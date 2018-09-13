import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './jobs_reducer';
import likedJobs from './like_reducer';

// combineReducer func name is removed after redux-persist v ^5.x.x. implementation
export default ({
    auth: auth,
    jobs: jobs,
    likedJobs: likedJobs
});