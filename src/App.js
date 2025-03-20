import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BudgetProvider } from './context/BudgetContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Home from './components/Home';
import { useBudget } from './context/BudgetContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Protected Route component
function ProtectedRoute({ children }) {
  const { state } = useBudget();
  return state.isAuthenticated ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { state } = useBudget();
  
  return (
    <div className={`App ${state.darkMode ? 'dark-mode' : ''}`}>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BudgetProvider>
      <Router>
        <AppContent />
      </Router>
    </BudgetProvider>
  );
}

export default App;
