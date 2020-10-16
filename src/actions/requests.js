import { FETCH_REQUESTS, ALTER_REQUEST_STATUS } from './actionTypes';
import { logError } from './error';
import { toastr } from 'react-redux-toastr';
import { alterRequestStatus } from '../services/requests';
import { handleInitialData } from './initialData';

export const getRequests = (requests) => {
  return {
    type: FETCH_REQUESTS,
    requests,
  };
};

const alterRequest = (recordIndex) => {
  return {
    type: ALTER_REQUEST_STATUS,
    recordIndex,
  };
};

export const handleRequestStatus = (request, status) => {
  return async (dispatch) => {
    try {
      const record = await alterRequestStatus(request.requestId, status);

      if (record.responseCode === '100') {
        dispatch(alterRequest(request.recordIndex));
        toastr.success(
          record.responseMessage,
          `Request ${record.responseMessage} successfully`
        );
        return true;
      }
      toastr.error('Error', 'Failed to record changes');
      return false;
    } catch (error) {
      toastr.error('Error', 'Failed to record changes');
      return dispatch(logError('Failed to record changes'));
    }
  };
};
