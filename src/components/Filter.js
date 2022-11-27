import React from "react";
import "./filter.css";

function Filter() {
  return (
    <>
      <div className="filter-container">
        <div className="filter-input">
          <input type="text" placeholder="Search for a country..." />
        </div>
        <div className="filter-region">
          <div className="dropdown">
            <button className="dropbtn">Filter By Region</button>
            <div className="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
