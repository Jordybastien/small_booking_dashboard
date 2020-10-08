import { FETCH_REQUESTS } from '../actions/actionTypes';

export default function requests(state = {}, action) {
  switch (action.type) {
    case FETCH_REQUESTS:
      return action.requests;
    default:
      return state;
  }
}
