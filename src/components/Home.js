import React from 'react';
import { Link } from 'react-router-dom';
import { useBudget } from '../context/BudgetContext';
import {
  BsWallet2,
  BsGraphUp,
  BsCurrencyExchange,
  BsMoonStars,
  BsShieldLock,
  BsCloudUpload
} from 'react-icons/bs';

function Home() {
  const { state } = useBudget();

  const features = [
    {
      icon: <BsWallet2 size={24} />,
      title: 'Expense Tracking',
      description: 'Easily track your income and expenses with a user-friendly interface.'
    },
    {
      icon: <BsGraphUp size={24} />,
      title: 'Visual Analytics',
      description: 'View your spending patterns with interactive charts and graphs.'
    },
    {
      icon: <BsCurrencyExchange size={24} />,
      title: 'Multi-Currency',
      description: 'Support for multiple currencies to manage your international finances.'
    },
    {
      icon: <BsMoonStars size={24} />,
      title: 'Dark Mode',
      description: 'Comfortable viewing experience with light and dark themes.'
    },
    {
      icon: <BsShieldLock size={24} />,
      title: 'Secure',
      description: 'Your financial data is protected and private.'
    },
    {
      icon: <BsCloudUpload size={24} />,
      title: 'Auto-Save',
      description: 'All your data is automatically saved and synced.'
    }
  ];

  return (
    <div className={`${state.darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      {/* Hero Section */}
      <div className="container py-5">
        <div className="row align-items-center py-5">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold mb-4">
              Take Control of Your Finances
            </h1>
            <p className="lead mb-4">
              Track expenses, monitor spending, and achieve your financial goals with our
              intuitive budget calculator.
            </p>
            {state.isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Go to Dashboard
              </Link>
            ) : (
              <div className="d-flex gap-3">
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline-primary btn-lg">
                  Login
                </Link>
              </div>
            )}
          </div>
          <div className="col-lg-6">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Budget Management"
              className="img-fluid rounded shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-5 ${state.darkMode ? 'bg-dark' : 'bg-white'}`}>
        <div className="container">
          <h2 className="text-center mb-5">Features</h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4">
                <div className={`card h-100 border-0 shadow-sm ${state.darkMode ? 'bg-dark text-light' : ''}`}>
                  <div className="card-body text-center">
                    <div className="text-primary mb-3">
                      {feature.icon}
                    </div>
                    <h5 className="card-title">{feature.title}</h5>
                    <p className="card-text text-muted">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container py-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h2 className="mb-4">Ready to Start Managing Your Budget?</h2>
            <p className="lead mb-4">
              Join thousands of users who are already managing their finances effectively.
            </p>
            {!state.isAuthenticated && (
              <Link to="/register" className="btn btn-primary btn-lg">
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 