import { SET_CALL_BACK_LINK } from './actionTypes';

export const setCallBackLink = (link) => {
  return {
    type: SET_CALL_BACK_LINK,
    link,
  };
};