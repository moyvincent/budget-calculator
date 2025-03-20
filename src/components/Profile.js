import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { BsPencil, BsCheck } from 'react-icons/bs';

function Profile() {
  const { state, updateProfile } = useBudget();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="card-title mb-0">Profile Information</h4>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? <BsCheck size={20} /> : <BsPencil />}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="row">
                  <div className="col-md-6">
                    <p className="text-muted mb-1">Name</p>
                    <p className="h5 mb-3">{state.user?.name}</p>

                    <p className="text-muted mb-1">Email</p>
                    <p className="h5 mb-3">{state.user?.email}</p>

                    <p className="text-muted mb-1">Member Since</p>
                    <p className="h5 mb-3">{formatDate(state.user?.joinDate)}</p>
                  </div>
                  <div className="col-md-6">
                    <div className="card bg-light">
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">Account Statistics</h6>
                        <ul className="list-unstyled mb-0">
                          <li className="mb-2">
                            <span className="text-muted">Total Expenses:</span>{' '}
                            <strong>{state.expenses.length}</strong>
                          </li>
                          <li className="mb-2">
                            <span className="text-muted">Preferred Currency:</span>{' '}
                            <strong>{state.currency.name}</strong>
                          </li>
                          <li>
                            <span className="text-muted">Theme:</span>{' '}
                            <strong>{state.darkMode ? 'Dark' : 'Light'}</strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 