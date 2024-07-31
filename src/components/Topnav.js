import React from "react";

const Topnav = () => {
  return (
    <nav className="topnav">
      <div className="topnav-bar">
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              Getting Started
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Documentation
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              FAQ's
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Topnav;
