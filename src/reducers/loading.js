import { LOADING, NOT_LOADING } from '../actions/actionTypes';

export default function loading(state = false, action) {
  switch (action.type) {
    case LOADING:
      return true;
    case NOT_LOADING:
      return false;
    default:
      return state;
  }
}
