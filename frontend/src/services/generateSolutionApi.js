import axios from 'axios';
import yaml from 'js-yaml';

const API_URL = 'http://localhost:3000/api/generate-solution';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
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
        response.data = yaml.load(response.data);
        console.log('Successfully parsed YAML response');
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
          error.response.data = yaml.load(error.response.data);
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

// Generate solution for a problem
export const generateSolution = async (problemId) => {
  try {
    const response = await api.post(`/${problemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to generate solution' };
  }
};

// Get solution for a problem
export const getSolution = async (problemId) => {
  try {
    const response = await api.get(`/${problemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch solution' };
  }
};

// Delete solution
export const deleteSolution = async (problemId) => {
  try {
    const response = await api.delete(`/${problemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete solution' };
  }
};

export default {
  generateSolution,
  getSolution,
  deleteSolution
};
