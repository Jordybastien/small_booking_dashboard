import api from './api';

export const fetchRequests = async () => {
  const res = await api.get('/requests/all');
  return res.data.meta.content;
};
