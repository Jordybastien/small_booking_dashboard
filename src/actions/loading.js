import { LOADING, NOT_LOADING } from './actionTypes';

export const showLoading = () => {
  return {
    type: LOADING,
  };
};

export const hideLoading = () => {
  return {
    type: NOT_LOADING,
  };
};
