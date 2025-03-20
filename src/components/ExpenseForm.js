import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';

function ExpenseForm() {
  const { addExpense } = useBudget();
  const [expense, setExpense] = useState({
    name: '',
    amount: '',
    category: 'Other'
  });

  const categories = [
    'Housing',
    'Transportation',
    'Food',
    'Utilities',
    'Healthcare',
    'Entertainment',
    'Shopping',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({
      ...expense,
      amount: Number(expense.amount)
    });
    setExpense({
      name: '',
      amount: '',
      category: 'Other'
    });
  };

  return (
    <div>
      <h4 className="mb-3">Add Expense</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Expense name"
            value={expense.name}
            onChange={(e) => setExpense({ ...expense, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={expense.amount}
              onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            value={expense.category}
            onChange={(e) => setExpense({ ...expense, category: e.target.value })}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm; 