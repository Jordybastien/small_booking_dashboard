import api from './api';

export const loginUser = async (user) => {
  const res = await api.post('/user/login', user);
  return res.data;
};

export const createUser = async (user) => {
  const res = await api.post('/user/create', user);
  return res.data;
};

export const tokenKey = 'DashboardApp:UserInfo';

export const checkUser = () => {
  const user = localStorage.getItem(tokenKey);
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
