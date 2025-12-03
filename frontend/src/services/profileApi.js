import api from './api';

export const updateProfile = async (profileData) => {
  const response = await api.put('/api/auth/profile', profileData);
  return response.data;
};

export const getUserStats = async () => {
  const response = await api.get('/api/auth/stats');
  return response.data;
};
