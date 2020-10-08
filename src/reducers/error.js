import { LOG_ERROR } from '../actions/actionTypes';

export default function (state = {}, action) {
  switch (action.type) {
    case LOG_ERROR:
      return action.error;
    default:
      return state;
  }
}
