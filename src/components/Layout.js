import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Layout({ children }) {
  const { state: { isAuthenticated }, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#3b82f6' }}>
        <div className="container">
          <Link className="navbar-brand" to="/">Budget Calculator</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              {isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav">
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-light py-4 mt-auto">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <p className="mb-0">© 2024 Budget Calculator. All rights reserved.</p>
            </div>
            <div className="col-md-4 text-center mb-3 mb-md-0">
              <div className="d-flex justify-content-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark social-icon"
                  style={{ fontSize: '1.5rem', transition: 'color 0.3s ease' }}
                  onMouseOver={(e) => e.target.style.color = '#3b82f6'}
                  onMouseOut={(e) => e.target.style.color = '#212529'}
                >
                  <FaGithub />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark social-icon"
                  style={{ fontSize: '1.5rem', transition: 'color 0.3s ease' }}
                  onMouseOver={(e) => e.target.style.color = '#3b82f6'}
                  onMouseOut={(e) => e.target.style.color = '#212529'}
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark social-icon"
                  style={{ fontSize: '1.5rem', transition: 'color 0.3s ease' }}
                  onMouseOver={(e) => e.target.style.color = '#3b82f6'}
                  onMouseOut={(e) => e.target.style.color = '#212529'}
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark social-icon"
                  style={{ fontSize: '1.5rem', transition: 'color 0.3s ease' }}
                  onMouseOver={(e) => e.target.style.color = '#3b82f6'}
                  onMouseOut={(e) => e.target.style.color = '#212529'}
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
            <div className="col-md-4 text-md-end">
              <a href="#" className="text-decoration-none me-3 text-dark">Privacy Policy</a>
              <a href="#" className="text-decoration-none text-dark">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout; 