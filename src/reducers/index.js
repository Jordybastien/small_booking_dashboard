import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loading from './loading';
import error from './error';
import authedUser from './authedUser';
import link from './callBackLink';
import requests from './requests';
import { reducer as toastrReducer } from 'react-redux-toastr';

export default combineReducers({
  form: formReducer,
  toastr: toastrReducer,
  loading,
  error,
  authedUser,
  link,
  requests,
});
