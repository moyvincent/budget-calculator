import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { BsTrash, BsPencil } from 'react-icons/bs';

function ExpenseList() {
  const { state, deleteExpense, editExpense } = useBudget();
  const [editingExpense, setEditingExpense] = useState(null);

  const handleEdit = (expense) => {
    if (editingExpense && editingExpense.id === expense.id) {
      editExpense(editingExpense);
      setEditingExpense(null);
    } else {
      setEditingExpense({ ...expense });
    }
  };

  const handleEditChange = (field, value) => {
    setEditingExpense({
      ...editingExpense,
      [field]: field === 'amount' ? Number(value) : value
    });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4 className="card-title mb-4">Expenses</h4>
        {state.expenses.length === 0 ? (
          <p className="text-muted">No expenses added yet.</p>
        ) : (
          <div className="list-group">
            {state.expenses.map((expense) => (
              <div
                key={expense.id}
                className="list-group-item list-group-item-action expense-item d-flex justify-content-between align-items-center"
              >
                {editingExpense && editingExpense.id === expense.id ? (
                  <div className="d-flex w-100 gap-2">
                    <input
                      type="text"
                      className="form-control"
                      value={editingExpense.name}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                    />
                    <input
                      type="number"
                      className="form-control"
                      value={editingExpense.amount}
                      onChange={(e) => handleEditChange('amount', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                    <select
                      className="form-select"
                      value={editingExpense.category}
                      onChange={(e) => handleEditChange('category', e.target.value)}
                    >
                      <option value="Housing">Housing</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Food">Food</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                ) : (
                  <>
                    <div>
                      <h6 className="mb-0">{expense.name}</h6>
                      <small className="text-muted">{expense.category}</small>
                    </div>
                    <span className="expense-amount">${expense.amount.toFixed(2)}</span>
                  </>
                )}
                <div>
                  <button
                    className="btn btn-icon btn-outline-primary me-2"
                    onClick={() => handleEdit(expense)}
                  >
                    <BsPencil />
                  </button>
                  <button
                    className="btn btn-icon btn-outline-danger"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    <BsTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseList; 