import api from './api';

// Generate testcases for a problem
export const generateTestcases = async (problemId) => {
  try {
    const response = await api.post(`/api/generate-testcase/generate/${problemId}`, {});
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get testcases for a problem
export const getTestcases = async (problemId) => {
  try {
    const response = await api.get(`/api/generate-testcase/${problemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete testcases for a problem
export const deleteTestcases = async (problemId) => {
  try {
    const response = await api.delete(`/api/generate-testcase/${problemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Regenerate testcases for a problem
export const regenerateTestcases = async (problemId) => {
  try {
    const response = await api.put(`/api/generate-testcase/regenerate/${problemId}`, {});
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
