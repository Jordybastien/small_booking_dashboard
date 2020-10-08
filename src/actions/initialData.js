import { showLoading, hideLoading } from './loading';
import { fetchRequests } from '../services/requests';
import { getRequests } from '../actions/requests';

const getInitialData = async () => await fetchRequests();

export const handleInitialData = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then((requests) => {
        dispatch(getRequests(requests));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};
