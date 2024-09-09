import React from "react";
import "./TileLayout.css";

const TileLayout = ({ isLoading, children }) => {
  return (
    <div className="tile-layout">
      <div className="table-container">
        {isLoading ? (
          <div className="loading-wrapper">
            <div className="loading-search"></div>
            <div className="loading-table">
              <div className="loading-row"></div>
              <div className="loading-row"></div>
              <div className="loading-row"></div>
              <div className="loading-row"></div>
              <div className="loading-row"></div>
            </div>

            <div className="parent-div-pagination-tile">
              <div className="page-number-tile"></div>
              <div className="page-number-tile"></div>
              <div className="page-number-tile"></div>
              <div className="page-number-tile"></div>
              <div className="page-number-tile"></div>
              <div className="page-number-tile"></div>
            </div>
          </div>
        ) : (
          <div>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default TileLayout;
