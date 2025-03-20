import React, { createContext, useContext, useReducer, useEffect } from 'react';

const BudgetContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  income: 0,
  expenses: [],
  darkMode: false,
  currency: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar'
  },
  availableCurrencies: [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
  ]
};

function budgetReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { 
        ...state, 
        user: action.payload,
        isAuthenticated: true 
      };
    case 'LOGOUT':
      return { 
        ...initialState,
        darkMode: state.darkMode 
      };
    case 'UPDATE_PROFILE':
      return { 
        ...state, 
        user: { ...state.user, ...action.payload } 
      };
    case 'SET_CURRENCY':
      return { 
        ...state, 
        currency: action.payload 
      };
    case 'SET_INCOME':
      return { ...state, income: action.payload };
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, { 
          ...action.payload, 
          id: Date.now(),
          date: new Date().toISOString(),
          currency: state.currency.code
        }]
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload)
      };
    case 'EDIT_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id 
            ? { ...action.payload, currency: state.currency.code }
            : expense
        )
      };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('budgetData');
    if (savedData) {
      dispatch({ type: 'LOAD_DATA', payload: JSON.parse(savedData) });
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem('budgetData', JSON.stringify(state));
    }
  }, [state]);

  const value = {
    state,
    login: (userData) => dispatch({ type: 'LOGIN', payload: userData }),
    logout: () => {
      localStorage.removeItem('budgetData');
      dispatch({ type: 'LOGOUT' });
    },
    updateProfile: (data) => dispatch({ type: 'UPDATE_PROFILE', payload: data }),
    setCurrency: (currency) => dispatch({ type: 'SET_CURRENCY', payload: currency }),
    setIncome: (income) => dispatch({ type: 'SET_INCOME', payload: Number(income) }),
    addExpense: (expense) => dispatch({ type: 'ADD_EXPENSE', payload: expense }),
    deleteExpense: (id) => dispatch({ type: 'DELETE_EXPENSE', payload: id }),
    editExpense: (expense) => dispatch({ type: 'EDIT_EXPENSE', payload: expense }),
    toggleDarkMode: () => dispatch({ type: 'TOGGLE_DARK_MODE' })
  };

  return (
    <BudgetContext.Provider value={value}>
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