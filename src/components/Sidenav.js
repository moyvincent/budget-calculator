import React from "react";
import Income from "./income";

const Sidenav = () => {
  return (
    <div className="d-flex align-items-start">
    <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button className="nav-link active" id="v-pills-dashboard-tab" data-bs-toggle="pill" data-bs-target="#v-pills-dashboard" type="button" role="tab" aria-controls="v-pills-dashboard" aria-selected="true">Dashboard</button>
      <button className="nav-link" id="v-pills-incomes-tab" data-bs-toggle="pill" data-bs-target="#v-pills-incomes" type="button" role="tab" aria-controls="v-pills-incomes" aria-selected="false">Incomes</button>
      <button className="nav-link" id="v-pills-budgets-tab" data-bs-toggle="pill" data-bs-target="#v-pills-budgets" type="button" role="tab" aria-controls="v-pills-budgets" aria-selected="false">Budgets</button>
      <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button>
      <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</button>
    </div>
    <div className="tab-content" id="v-pills-tabContent">
      <div className="tab-pane fade show active" id="v-pills-dashboard" role="tabpanel" aria-labelledby="v-pills-dashboard-tab" tabindex="0">...</div>
      <div className="tab-pane fade" id="v-pills-incomes" role="tabpanel" aria-labelledby="v-pills-incomes-tab" tabindex="0"><Income /></div>
      <div className="tab-pane fade" id="v-pills-budgets" role="tabpanel" aria-labelledby="v-pills-budgets-tab" tabindex="0">...</div>
      <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabindex="0">...</div>
      <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabindex="0">...</div>
    </div>
  </div>
  );
};

export default Sidenav;