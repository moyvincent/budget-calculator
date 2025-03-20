import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import TransactionForm from './TransactionForm';
import Charts from './Charts';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

function Dashboard() {
  const { state, deleteTransaction } = useBudget();
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const totalIncome = state.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = state.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowTransactionForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(id);
    }
  };

  const handleCloseForm = () => {
    setShowTransactionForm(false);
    setEditingTransaction(null);
  };

  return (
    <div className="container py-4">
      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Total Income</h6>
                  <h3 className="card-title text-success mb-0">
                    {state.currency.symbol}{totalIncome.toFixed(2)}
                  </h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                  <FiTrendingUp className="text-success" size={24} />
                </div>
              </div>
              <p className="card-text text-muted small">Total earnings this period</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Total Expenses</h6>
                  <h3 className="card-title text-danger mb-0">
                    {state.currency.symbol}{totalExpenses.toFixed(2)}
                  </h3>
                </div>
                <div className="bg-danger bg-opacity-10 p-3 rounded-circle">
                  <FiTrendingDown className="text-danger" size={24} />
                </div>
              </div>
              <p className="card-text text-muted small">Total spending this period</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Current Balance</h6>
                  <h3 className={`card-title mb-0 ${balance >= 0 ? 'text-primary' : 'text-danger'}`}>
                    {state.currency.symbol}{balance.toFixed(2)}
                  </h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                  <FiDollarSign className="text-primary" size={24} />
                </div>
              </div>
              <p className="card-text text-muted small">Available balance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Transactions</h5>
            <button
              onClick={() => setShowTransactionForm(true)}
              className="btn btn-primary d-flex align-items-center gap-2"
            >
              <FiPlus size={18} />
              Add Transaction
            </button>
          </div>
        </div>

        <div className="card-body">
          {showTransactionForm && (
            <div className="mb-4 bg-light p-4 rounded">
              <TransactionForm
                onClose={handleCloseForm}
                editTransaction={editingTransaction}
              />
            </div>
          )}

          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${
                        transaction.type === 'income' 
                          ? 'text-bg-success' 
                          : 'text-bg-danger'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td>{transaction.category}</td>
                    <td>{transaction.description}</td>
                    <td className={transaction.type === 'income' ? 'text-success' : 'text-danger'}>
                      {state.currency.symbol}{transaction.amount.toFixed(2)}
                    </td>
                    <td className="text-end">
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="btn btn-link text-primary p-0 me-3"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="btn btn-link text-danger p-0"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Analytics</h5>
          <Charts transactions={state.transactions} currency={state.currency} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 