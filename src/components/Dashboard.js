import React, { useMemo } from 'react';
import { useBudget } from '../context/BudgetContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';

function Dashboard() {
  const { state } = useBudget();
  const { currency } = state;

  // Calculate monthly statistics
  const monthlyStats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyExpenses = state.expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });

    const totalMonthlyExpense = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const averageExpense = monthlyExpenses.length ? totalMonthlyExpense / monthlyExpenses.length : 0;
    const highestExpense = monthlyExpenses.reduce((max, exp) => Math.max(max, exp.amount), 0);

    return {
      count: monthlyExpenses.length,
      total: totalMonthlyExpense,
      average: averageExpense,
      highest: highestExpense
    };
  }, [state.expenses]);

  // Prepare data for the line chart
  const chartData = useMemo(() => {
    const expensesByDay = {};
    state.expenses.forEach(expense => {
      const date = new Date(expense.date).toLocaleDateString();
      expensesByDay[date] = (expensesByDay[date] || 0) + expense.amount;
    });

    return Object.entries(expensesByDay).map(([date, amount]) => ({
      date,
      amount
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [state.expenses]);

  // Calculate category statistics
  const categoryStats = useMemo(() => {
    const stats = {};
    state.expenses.forEach(expense => {
      if (!stats[expense.category]) {
        stats[expense.category] = {
          count: 0,
          total: 0
        };
      }
      stats[expense.category].count++;
      stats[expense.category].total += expense.amount;
    });
    return stats;
  }, [state.expenses]);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Financial Dashboard</h2>
      
      {/* Monthly Overview */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Monthly Expenses</h6>
              <h3 className="card-title mb-0">{monthlyStats.count}</h3>
              <small className="text-muted">transactions this month</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Total Spent</h6>
              <h3 className="card-title mb-0 expense-amount">
                {currency.symbol}{monthlyStats.total.toFixed(2)}
              </h3>
              <small className="text-muted">this month</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Average Expense</h6>
              <h3 className="card-title mb-0">
                {currency.symbol}{monthlyStats.average.toFixed(2)}
              </h3>
              <small className="text-muted">per transaction</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Highest Expense</h6>
              <h3 className="card-title mb-0 text-danger">
                {currency.symbol}{monthlyStats.highest.toFixed(2)}
              </h3>
              <small className="text-muted">single transaction</small>
            </div>
          </div>
        </div>
      </div>

      {/* Expense Trend Chart */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">Expense Trend</h5>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `${currency.symbol}${value.toFixed(2)}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Category Breakdown</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Transactions</th>
                  <th>Total Amount</th>
                  <th>Average</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(categoryStats).map(([category, stats]) => (
                  <tr key={category}>
                    <td>{category}</td>
                    <td>{stats.count}</td>
                    <td className="expense-amount">
                      {currency.symbol}{stats.total.toFixed(2)}
                    </td>
                    <td>
                      {currency.symbol}{(stats.total / stats.count).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 