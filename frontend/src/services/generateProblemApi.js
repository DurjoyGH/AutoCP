import axios from 'axios';
import yaml from 'js-yaml';

// Remove trailing slash from API URL to prevent double slashes
const getApiUrl = () => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  return baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
};

// Create axios instance with default config for YAML responses
const api = axios.create({
  baseURL: `${getApiUrl()}/api/generate-problem`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to parse YAML responses
api.interceptors.response.use(
  (response) => {
    // If response is YAML, parse it
    const contentType = response.headers['content-type'] || '';
    const isYaml = contentType.includes('yaml') || contentType.includes('x-yaml');
    
    if (isYaml && typeof response.data === 'string') {
      try {
        console.log('Parsing YAML response...');
        // Use json: true to prevent circular references
        response.data = yaml.load(response.data, { json: true });
        console.log('Successfully parsed YAML response');
        
        // Debug validation data
        if (response.data?.data?.validationReport?.testCaseResults) {
          console.log('Validation test case results detected');
          console.log('Total results:', response.data.data.validationReport.testCaseResults.length);
          console.log('All isValid values:');
          response.data.data.validationReport.testCaseResults.forEach((tc, idx) => {
            console.log(`  Test Case ${idx + 1}:`, tc.isValid, `(${typeof tc.isValid})`);
          });
        }
      } catch (e) {
        console.error('Failed to parse YAML response:', e);
        console.error('Raw response:', response.data.substring(0, 500));
        // Return error object instead of throwing
        response.data = {
          success: false,
          message: 'Failed to parse server response',
          error: e.message
        };
      }
    }
    return response;
  },
  (error) => {
    // Parse error response if it's YAML
    if (error.response?.data && typeof error.response.data === 'string') {
      const contentType = error.response.headers['content-type'] || '';
      const isYaml = contentType.includes('yaml') || contentType.includes('x-yaml');
      
      if (isYaml) {
        try {
          // Use json: true to prevent circular references
          error.response.data = yaml.load(error.response.data, { json: true });
        } catch (e) {
          console.error('Failed to parse YAML error response:', e);
          error.response.data = {
            success: false,
            message: 'Failed to parse error response',
            error: e.message
          };
        }
      }
    }
    return Promise.reject(error);
  }
);

// Generate a new problem
export const generateProblem = async (problemData) => {
  try {
    const response = await api.post('', problemData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to generate problem' };
  }
};

// Get problem history
export const getProblemHistory = async (page = 1, limit = 10) => {
  try {
    const response = await api.get('/history', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch problem history' };
  }
};

// Get favorite problems
export const getFavoriteProblems = async (page = 1, limit = 10) => {
  try {
    const response = await api.get('/favorites', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch favorite problems' };
  }
};

// Get single problem by ID
export const getProblemById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch problem' };
  }
};

// Toggle favorite status
export const toggleFavorite = async (id) => {
  try {
    const response = await api.put(`/${id}/favorite`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update favorite status' };
  }
};

// Delete problem
export const deleteProblem = async (id) => {
  try {
    // Ensure id is a string
    const problemId = typeof id === 'object' ? id.toString() : String(id);
    console.log('Deleting problem with ID:', problemId);
    const response = await api.delete(`/${problemId}`);
    return response.data;
  } catch (error) {
    console.error('Delete problem API error:', error);
    throw error.response?.data || { message: 'Failed to delete problem' };
  }
};

// Get validation status and report
export const getValidationStatus = async (id) => {
  try {
    const response = await api.get(`/${id}/validation`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch validation status' };
  }
};

export default {
  generateProblem,
  getProblemHistory,
  getFavoriteProblems,
  getProblemById,
  toggleFavorite,
  deleteProblem,
  getValidationStatus
};
