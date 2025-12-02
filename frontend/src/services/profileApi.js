import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const updateProfile = async (profileData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(
    `${API_URL}/api/auth/profile`,
    profileData,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
};

export const getUserStats = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(
    `${API_URL}/api/auth/stats`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  return response.data;
};
