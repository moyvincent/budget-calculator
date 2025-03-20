import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { auth as authApi } from '../services/api';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };
    case 'LOGOUT':
      return {
        ...initialState
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser();
    }
  }, []);

  const getCurrentUser = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const userData = await authApi.getCurrentUser();
      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
    } catch (error) {
      console.error('Error getting current user:', error);
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (username, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authApi.login(username, password);
      localStorage.setItem('token', response.access_token);
      await getCurrentUser();
    } catch (error) {
      let errorMessage = 'Login failed';
      if (error.response?.data) {
        // Handle FastAPI validation error format
        if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map(err => err.msg).join(', ');
        } else if (typeof error.response.data.detail === 'string') {
          errorMessage = error.response.data.detail;
        }
      }
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await authApi.register(userData);
      // After registration, log the user in
      await login(userData.username, userData.password);
    } catch (error) {
      let errorMessage = 'Registration failed';
      if (error.response?.data) {
        // Handle FastAPI validation error format
        if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map(err => err.msg).join(', ');
        } else if (typeof error.response.data.detail === 'string') {
          errorMessage = error.response.data.detail;
        }
      }
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext; 