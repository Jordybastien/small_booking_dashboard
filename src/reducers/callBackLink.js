import { SET_CALL_BACK_LINK } from '../actions/actionTypes';

export default function callBackLink(state = null, action) {
  switch (action.type) {
    case SET_CALL_BACK_LINK:
      return action.link;
    default:
      return state;
  }
}
