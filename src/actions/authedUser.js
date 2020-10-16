import { SET_AUTHED_USER, LOGOUT_USER } from './actionTypes';
import { logError } from './error';
import { tokenKey, loginUser } from '../services/auth';
import { toastr } from 'react-redux-toastr';
import { createUser } from '../services/auth';

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
  return async (dispatch) => {
    try {
      const authenticate = await loginUser(user);
      if (authenticate.responseCode === '101') {
        return dispatch(logError(authenticate.responseMessage));
      } else {
        localStorage.setItem(
          tokenKey,
          JSON.stringify(authenticate.meta.content)
        );
        return dispatch(setAuthedUser(authenticate.meta.content));
      }
    } catch (error) {
      return dispatch(
        logError(
          error.response
            ? error.response.data.error
            : 'Failed to authenticate Please contact Us'
        )
      );
    }
  };
};

export const handleCreateUser = (data) => {
  return async (dispatch) => {
    try {
      const record = await createUser(data);

      if (record.responseCode === '100') {
        toastr.success('User Added', 'User added successfully!');
        return true;
      }
      toastr.error('Error', 'Failed to add user');
      return false;
    } catch (error) {
      toastr.error('Error', 'Failed to add user');
      return dispatch(logError('Failed to add user'));
    }
  };
};
