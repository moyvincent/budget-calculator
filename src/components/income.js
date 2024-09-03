import React, { useState, useEffect } from "react";
import config from "../config";

const Income = () => {
  // Define state variables for form inputs
  const [incomeName, setIncomeName] = useState("");
  const [incomeType, setIncomeType] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomes, setIncomes] = useState([]); // State to store incomes
  const backendUrl = config.backendUrl; // Extract the backendUrl from the config

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Make a POST API request to FastAPI backend
    try {
      const response = await fetch(`${backendUrl}/income/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          income_name: incomeName,
          income_type: incomeType,
          income_amount: parseFloat(incomeAmount),
        }),
      });

      if (response.ok) {
        // If the request was successful
        console.log("Income created successfully");

        // Optionally reset form inputs
        setIncomeName("");
        setIncomeType("");
        setIncomeAmount("");

        // Close the modal
        // Assuming you have Bootstrap modal jQuery integration or close logic
        const modalElement = document.getElementById("incomeModal");
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
      } else {
        // Handle errors from the server
        console.error("Failed to create income");
      }
    } catch (error) {
      console.error("Error creating income:", error);
    }
  };

  // Make a GET API request to FastAPI backend to get all incomes
  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await fetch(`${backendUrl}/incomes/`);
        if (response.ok) {
          const data = await response.json();
          setIncomes(data); // Set the retrieved incomes to state
        } else {
          console.error("Failed to fetch incomes");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchIncomes(); // Fetch incomes on component mount
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      {/* Button Trigger Modal */}
      <a
        className="btn btn-primary"
        role="button"
        data-bs-toggle="modal"
        data-bs-target="#incomeModal"
      >
        <i className="bi bi-plus-lg"></i> Create
      </a>

      {/* Income Modal */}
      <div
        className="modal fade"
        id="incomeModal"
        tabIndex="-1"
        aria-labelledby="incomeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="incomeModalLabel">
                Add new income
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
                  <label htmlFor="incomeName" className="form-label">
                    Name of Income
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="incomeName"
                    value={incomeName}
                    onChange={(e) => setIncomeName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="incomeType" className="form-label">
                    Income Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="incomeType"
                    value={incomeType}
                    onChange={(e) => setIncomeType(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="incomeAmount" className="form-label">
                    Income Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="incomeAmount"
                    value={incomeAmount}
                    onChange={(e) => setIncomeAmount(e.target.value)}
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

      {/* Income List table */}
      <table class="table">
        <thead class="table-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name of Income</th>
            <th scope="col">Income type</th>
            <th scope="col">Income amount</th>
          </tr>
        </thead>
        <tbody>
          {incomes.length > 0 ? (
            incomes.map((income) => (
              <tr key={income.id}>
                <th scope="row">{income.id}</th>
                <td>{income.income_name}</td>
                <td>{income.income_type}</td>
                <td>{income.income_amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No incomes available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Income;
