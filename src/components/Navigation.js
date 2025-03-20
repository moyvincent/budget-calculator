import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBudget } from '../context/BudgetContext';
import { BsSun, BsMoonStars, BsPerson, BsBoxArrowRight } from 'react-icons/bs';

function Navigation() {
  const { state, toggleDarkMode, logout, setCurrency } = useBudget();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${state.darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">Budget Calculator</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {state.isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reports">Reports</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
          
          {state.isAuthenticated ? (
            <div className="d-flex align-items-center">
              <div className="me-3">
                <select
                  className="form-select"
                  value={state.currency.code}
                  onChange={(e) => {
                    const selectedCurrency = state.availableCurrencies.find(
                      c => c.code === e.target.value
                    );
                    setCurrency(selectedCurrency);
                  }}
                >
                  {state.availableCurrencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} ({currency.symbol})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="btn-group me-3">
                <button
                  type="button"
                  className={`btn ${state.darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                  onClick={toggleDarkMode}
                >
                  {state.darkMode ? <BsSun /> : <BsMoonStars />}
                </button>
              </div>

              <div className="dropdown">
                <button
                  className={`btn ${state.darkMode ? 'btn-outline-light' : 'btn-outline-dark'} dropdown-toggle`}
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <BsPerson className="me-1" />
                  {state.user?.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                  <li>
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <BsBoxArrowRight className="me-1" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-primary">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 