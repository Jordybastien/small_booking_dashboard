import { LOG_ERROR } from './actionTypes';

export const logError = (error) => {
  return {
    type: LOG_ERROR,
    error,
  };
};
