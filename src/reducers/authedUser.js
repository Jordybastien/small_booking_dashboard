import { SET_AUTHED_USER, LOGOUT_USER } from '../actions/actionTypes';

export default function authedUser(state = {}, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.user;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}
