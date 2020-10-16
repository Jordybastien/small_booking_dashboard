import { FETCH_REQUESTS, ALTER_REQUEST_STATUS } from '../actions/actionTypes';

export default function requests(state = {}, action) {
  switch (action.type) {
    case FETCH_REQUESTS:
      return action.requests;

    case ALTER_REQUEST_STATUS:
      return {
        ...state,
        [action.recordIndex]: {
          ...state[action.recordIndex],
          status: 1,
        },
      };
    default:
      return state;
  }
}
