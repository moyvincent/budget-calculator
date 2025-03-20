import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';

// Predefined categories for expenses and income
const CATEGORIES = {
  expense: [
    'Food & Dining',
    'Transportation',
    'Housing',
    'Utilities',
    'Healthcare',
    'Entertainment',
    'Shopping',
    'Education',
    'Personal Care',
    'Travel',
    'Insurance',
    'Debt Payment',
    'Other'
  ],
  income: [
    'Salary',
    'Freelance',
    'Investments',
    'Business',
    'Rental',
    'Gift',
    'Other'
  ]
};

function TransactionForm({ onClose, editTransaction = null }) {
  const { state, addTransaction, updateTransaction } = useBudget();
  const [formData, setFormData] = useState({
    amount: editTransaction?.amount || '',
    description: editTransaction?.description || '',
    category: editTransaction?.category || (editTransaction?.type === 'income' ? CATEGORIES.income[0] : CATEGORIES.expense[0]),
    type: editTransaction?.type || 'expense',
    date: editTransaction?.date 
      ? new Date(editTransaction.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Amount must be greater than 0');
      return false;
    }
    if (!formData.category) {
      setError('Category is required');
      return false;
    }
    if (!formData.type || !['income', 'expense'].includes(formData.type)) {
      setError('Invalid transaction type');
      return false;
    }
    if (!formData.date) {
      setError('Date is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create a new Date object at noon UTC to avoid timezone issues
      const dateObj = new Date(formData.date);
      dateObj.setUTCHours(12);

      const transaction = {
        amount: parseFloat(formData.amount),
        description: formData.description || null, // Send null if empty as it's optional
        category: formData.category,
        type: formData.type,
        date: dateObj.toISOString() // Send as ISO string for backend
      };

      if (editTransaction) {
        await updateTransaction(editTransaction.id, transaction);
      } else {
        await addTransaction(transaction);
      }
      onClose();
    } catch (error) {
      console.error('Error saving transaction:', error);
      if (error.response?.data?.detail) {
        // Handle FastAPI validation errors
        if (Array.isArray(error.response.data.detail)) {
          setError(error.response.data.detail.map(err => err.msg).join(', '));
        } else {
          setError(error.response.data.detail);
        }
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('An error occurred while saving the transaction. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null); // Clear error when user makes changes
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset category when type changes to ensure it matches the new type
      ...(name === 'type' && { category: CATEGORIES[value][0] })
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">
          Amount ({state.currency.symbol})
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min="0.01"
          step="0.01"
          className={`form-control ${error && !formData.amount ? 'is-invalid' : ''}`}
          placeholder="Enter amount"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description (Optional)</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter description"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className={`form-select ${error && !formData.category ? 'is-invalid' : ''}`}
        >
          {CATEGORIES[formData.type].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className={`form-control ${error && !formData.date ? 'is-invalid' : ''}`}
        />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {editTransaction ? 'Updating...' : 'Adding...'}
            </>
          ) : (
            <>{editTransaction ? 'Update' : 'Add'} Transaction</>
          )}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm; 