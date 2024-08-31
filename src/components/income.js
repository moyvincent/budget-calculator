import React from "react";

const Income = () => {
  return (
    <div>
      {/* Button Trigger Modal */}
      <a
        class="btn btn-primary"
        role="button"
        data-bs-toggle="modal"
        data-bs-target="#incomeModal"
      >
        <i class="bi bi-plus-lg"></i> Create
      </a>

      {/* Income Modal */}
      <div
        class="modal fade"
        id="incomeModal"
        tabindex="-1"
        aria-labelledby="incomeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="incomeModalLabel">
                Add new income
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="incomeName" class="form-label">
                    Name of Income
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="incomeName"
                  />
                </div>
                <div class="mb-3">
                  <label for="incomeType" class="form-label">
                    Incompe Type
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="incomeType"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <table class="table">
        <thead class="table-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name of Income</th>
            <th scope="col">Income type</th>
            <th scope="col">Budget</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry the Bird</td>
            <td></td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Income;
