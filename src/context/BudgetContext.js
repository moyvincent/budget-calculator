import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { transactions as transactionsApi } from '../services/api';

const BudgetContext = createContext();

const initialState = {
  transactions: [],
  currency: { symbol: '$', code: 'USD' },
  loading: false,
  error: null,
  stats: {
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0
  }
};

function budgetReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.id ? action.payload : transaction
        )
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload
        )
      };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    default:
      return state;
  }
}

export function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  // Load transactions when component mounts
  useEffect(() => {
    loadTransactions();
  }, []);

  // Load transactions from API
  const loadTransactions = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const transactions = await transactionsApi.getAll();
      dispatch({ type: 'SET_TRANSACTIONS', payload: transactions });
      await loadStats();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Load transaction stats
  const loadStats = async () => {
    try {
      const stats = await transactionsApi.getStats();
      dispatch({ type: 'SET_STATS', payload: stats });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  // Add new transaction
  const addTransaction = async (transaction) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const newTransaction = await transactionsApi.create(transaction);
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
      await loadStats();
      return newTransaction;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Update transaction
  const updateTransaction = async (id, transaction) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedTransaction = await transactionsApi.update(id, transaction);
      dispatch({ type: 'UPDATE_TRANSACTION', payload: updatedTransaction });
      await loadStats();
      return updatedTransaction;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await transactionsApi.delete(id);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
      await loadStats();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Update currency settings
  const updateCurrency = (currency) => {
    dispatch({ type: 'SET_CURRENCY', payload: currency });
  };

  return (
    <BudgetContext.Provider
      value={{
        state,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        updateCurrency,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}

export default BudgetContext; 