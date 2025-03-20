import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';
const API_PREFIX = '/api/v1';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const auth = {
  login: async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    const response = await api.post(`${API_PREFIX}/auth/login`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post(`${API_PREFIX}/auth/register`, userData);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get(`${API_PREFIX}/users/me`);
    return response.data;
  },
};

// Transaction APIs
export const transactions = {
  getAll: async () => {
    const response = await api.get(`${API_PREFIX}/transactions`);
    return response.data;
  },
  create: async (transactionData) => {
    const response = await api.post(`${API_PREFIX}/transactions`, transactionData);
    return response.data;
  },
  update: async (id, transactionData) => {
    const response = await api.put(`${API_PREFIX}/transactions/${id}`, transactionData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`${API_PREFIX}/transactions/${id}`);
    return response.data;
  },
  getStats: async () => {
    const response = await api.get(`${API_PREFIX}/transactions/stats`);
    return response.data;
  },
};

// User settings APIs
export const settings = {
  updateCurrency: async (currencyData) => {
    const response = await api.put(`${API_PREFIX}/users/me/currency`, currencyData);
    return response.data;
  },
  updatePassword: async (passwordData) => {
    const response = await api.put(`${API_PREFIX}/users/me/password`, passwordData);
    return response.data;
  },
};

export default {
  auth,
  transactions,
  settings,
}; 