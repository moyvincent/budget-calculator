import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { BsSun, BsMoonStars } from 'react-icons/bs';

function Header() {
  const { state, toggleDarkMode } = useBudget();

  return (
    <nav className={`navbar navbar-expand-lg ${state.darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container">
        <span className="navbar-brand">Budget Calculator</span>
        <button
          className={`btn ${state.darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
          onClick={toggleDarkMode}
        >
          {state.darkMode ? <BsSun /> : <BsMoonStars />}
        </button>
      </div>
    </nav>
  );
}

export default Header;
