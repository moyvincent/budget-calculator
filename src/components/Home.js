import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { state: { isAuthenticated } } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Take Control of Your Finances</h1>
              <p className="lead mb-4">
                Track your income and expenses, set budgets, and achieve your financial goals with our easy-to-use budget calculator.
              </p>
              {!isAuthenticated && (
                <div className="d-flex gap-3">
                  <Link to="/register" className="btn btn-light btn-lg">Get Started</Link>
                  <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
                </div>
              )}
            </div>
            <div className="col-lg-6">
              <img
                src="https://placehold.co/600x400"
                alt="Budget Management"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose Our Budget Calculator?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="display-4 text-primary mb-3">
                    <i className="bi bi-graph-up"></i>
                  </div>
                  <h3 className="h4 mb-3">Track Expenses</h3>
                  <p className="text-muted">
                    Easily monitor your spending habits and categorize your expenses for better financial management.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="display-4 text-primary mb-3">
                    <i className="bi bi-piggy-bank"></i>
                  </div>
                  <h3 className="h4 mb-3">Set Budgets</h3>
                  <p className="text-muted">
                    Create custom budgets for different categories and track your progress towards your financial goals.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="display-4 text-primary mb-3">
                    <i className="bi bi-bar-chart"></i>
                  </div>
                  <h3 className="h4 mb-3">Insightful Analytics</h3>
                  <p className="text-muted">
                    Get detailed reports and visualizations to understand your spending patterns and make informed decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Start Managing Your Finances?</h2>
          <p className="lead mb-4">
            Join thousands of users who have already taken control of their financial future.
          </p>
          {!isAuthenticated && (
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Free Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home; 