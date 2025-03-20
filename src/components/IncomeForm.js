import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';

function IncomeForm() {
  const { state, setIncome } = useBudget();
  const [tempIncome, setTempIncome] = useState(state.income);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIncome(tempIncome);
  };

  return (
    <div>
      <h4 className="mb-3">Monthly Income</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text">$</span>
          <input
            type="number"
            className="form-control"
            value={tempIncome}
            onChange={(e) => setTempIncome(e.target.value)}
            placeholder="Enter your monthly income"
            min="0"
            step="0.01"
            required
          />
          <button type="submit" className="btn btn-primary">
            Update Income
          </button>
        </div>
      </form>
      <div className="mt-2">
        <small className="text-muted">
          Current monthly income: <span className="income-amount">${state.income.toFixed(2)}</span>
        </small>
      </div>
    </div>
  );
}

export default IncomeForm; 