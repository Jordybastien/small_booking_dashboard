import axios from 'axios';

export const baseURL = 'http://162.0.238.83:12000/api/';

const apiCall = axios.create({
  baseURL,
});

export default {
  get: apiCall.get,
  post: apiCall.post,
};
