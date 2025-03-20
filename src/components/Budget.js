import React, { useState, useEffect } from "react";
import config from "../config";
//import { fetchIncomes } from "./income";


const Budget = () => {
  // Define state variables for form inputs
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [incomes, setIncomes] = useState([]); // State to store incomes
  const backendUrl = config.backendUrl; // Extract the backendUrl from the config
  // Fetch incomes on component mount
  useEffect(() => {
    fetchIncomes(); 
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      {/* Button Trigger Modal */}
      <a
        className="btn btn-primary"
        role="button"
        data-bs-toggle="modal"
        data-bs-target="#budgetModal"
      >
        <i className="bi bi-plus-lg"></i> Create
      </a>

      {/* Budget Modal */}
      <div
        className="modal fade"
        id="budgetModal"
        tabIndex="-1"
        aria-labelledby="budgetModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="budgetModalLabel">
                Add new Budget
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="budgetName" className="form-label">
                    Name of Budget
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="budgetName"
                    value={budgetName}
                    onChange={(e) => setBudgetName(e.target.value)}
                  />
                </div>
                <select
                  class="mb-2 form-select"
                  aria-label="Default select example"
                >
                  <option selected>Choose an income</option>
                  {incomes.length > 0 ? (
                    incomes.map((income) => (
                      <option value={budgetIncome}>{income.income_name}</option>
                    ))
                  ) : (
                    <option>No incomes available</option>
                  )}
                </select>
                <div className="mb-3">
                  <label htmlFor="budgetAmount" className="form-label">
                    Budget Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="budgetAmount"
                    value={incomeAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
