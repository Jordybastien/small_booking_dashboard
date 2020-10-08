import { SET_AUTHED_USER, LOGOUT_USER } from './actionTypes';
import { logError } from './error';
// import { tokenKey, loginUser } from '../services/auth';

export const setAuthedUser = (user) => {
  return {
    type: SET_AUTHED_USER,
    user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const handleUserLogin = (user) => {
  // TODO: Authenticate
  // return async (dispatch) => {
  //   try {
  //     const authenticate = await loginUser(user);
  //     if (authenticate.responseCode === '101') {
  //       return dispatch(logError(authenticate.responseMessage));
  //     } else {
  //       localStorage.setItem(
  //         tokenKey,
  //         JSON.stringify(authenticate.meta.content)
  //       );
  //       return dispatch(setAuthedUser(authenticate.meta.content));
  //     }
  //   } catch (error) {
  //     return dispatch(
  //       logError(
  //         error.response
  //           ? error.response.data.error
  //           : 'Failed to authenticate Please contact Us'
  //       )
  //     );
  //   }
  // };
};
