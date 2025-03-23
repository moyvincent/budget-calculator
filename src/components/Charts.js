import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function Charts({ transactions, currency }) {
  // Prepare data for the line chart
  const lineChartData = useMemo(() => {
    const dailyTotals = {};
    transactions.forEach(transaction => {
      const date = new Date(transaction.date).toLocaleDateString();
      if (!dailyTotals[date]) {
        dailyTotals[date] = { date, income: 0, expense: 0 };
      }
      if (transaction.type === 'income') {
        dailyTotals[date].income += transaction.amount;
    } else {
        dailyTotals[date].expense += transaction.amount;
      }
    });

    return Object.values(dailyTotals).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [transactions]);

  // Prepare data for the category pie charts
  const pieChartData = useMemo(() => {
    const incomeByCategory = {};
    const expenseByCategory = {};

    transactions.forEach(transaction => {
      const categories = transaction.type === 'income' ? incomeByCategory : expenseByCategory;
      if (!categories[transaction.category]) {
        categories[transaction.category] = 0;
      }
      categories[transaction.category] += transaction.amount;
    });

    return {
      income: Object.entries(incomeByCategory).map(([name, value]) => ({ name, value })),
      expense: Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }))
    };
  }, [transactions]);

  const formatCurrency = (value) => `${currency.symbol}${value.toFixed(2)}`;

  return (
    <div className="mb-4">
      {/* Line Chart */}
      <div className="card mb-4">
      <div className="card-body">
          <h3 className="card-title h5 mb-4">Income vs Expenses Over Time</h3>
          <div style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={formatCurrency} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#198754"
                  name="Income"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#dc3545"
                  name="Expense"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pie Charts */}
      <div className="row g-4">
        {/* Income Categories */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title h5 mb-4">Income by Category</h3>
              <div style={{ height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData.income}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {pieChartData.income.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={formatCurrency} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Categories */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title h5 mb-4">Expenses by Category</h3>
              <div style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                      data={pieChartData.expense}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                      outerRadius={120}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {pieChartData.expense.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                    <Tooltip formatter={formatCurrency} />
              </PieChart>
            </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts; 