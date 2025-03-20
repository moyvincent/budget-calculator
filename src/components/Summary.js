import React from 'react';
import { useBudget } from '../context/BudgetContext';

function Summary() {
  const { state } = useBudget();

  const totalExpenses = state.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBalance = state.income - totalExpenses;
  const spentPercentage = state.income ? (totalExpenses / state.income) * 100 : 0;

  return (
    <div className="row g-4">
      <div className="col-md-4">
        <div className="card shadow-sm summary-card">
          <div className="card-body text-center">
            <h5 className="card-title">Total Income</h5>
            <p className="income-amount h3">${state.income.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm summary-card">
          <div className="card-body text-center">
            <h5 className="card-title">Total Expenses</h5>
            <p className="expense-amount h3">${totalExpenses.toFixed(2)}</p>
            <div className="progress">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: `${spentPercentage}%` }}
                aria-valuenow={spentPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            <small className="text-muted mt-2">
              {spentPercentage.toFixed(1)}% of income spent
            </small>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm summary-card">
          <div className="card-body text-center">
            <h5 className="card-title">Remaining Balance</h5>
            <p className={`h3 ${remainingBalance >= 0 ? 'balance-amount' : 'expense-amount'}`}>
              ${remainingBalance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary; 