import api from './api';

// Submit solution
export const submitSolution = async (problemId, language, code) => {
  try {
    const response = await api.post('/api/judge/submit', {
      problemId,
      language,
      code
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to submit solution' };
  }
};

// Get submission status
export const getSubmissionStatus = async (submissionId) => {
  try {
    const response = await api.get(`/api/judge/submission/${submissionId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch submission status' };
  }
};

// Get all submissions for a problem
export const getProblemSubmissions = async (problemId) => {
  try {
    const response = await api.get(`/api/judge/problem/${problemId}/submissions`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch problem submissions' };
  }
};

// Get all user submissions
export const getUserSubmissions = async (page = 1, limit = 20) => {
  try {
    const response = await api.get('/api/judge/submissions', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user submissions' };
  }
};

export default {
  submitSolution,
  getSubmissionStatus,
  getProblemSubmissions,
  getUserSubmissions
};
