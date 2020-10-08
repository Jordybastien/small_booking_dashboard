import { FETCH_REQUESTS } from './actionTypes';
import { logError } from './error';
import { toastr } from 'react-redux-toastr';

export const getRequests = (requests) => {
  return {
    type: FETCH_REQUESTS,
    requests,
  };
};