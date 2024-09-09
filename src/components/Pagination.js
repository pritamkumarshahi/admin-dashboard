import React from "react";

const Pagination = ({
  usersPerPage,
  totalUsers,
  paginate,
  currentPage,
  totalPages,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="parent-div-pagination">
      <div
        onClick={() => currentPage > 1 && paginate(1)}
        className={`page-number ${currentPage === 1 ? "disabled" : ""}`}
      >
          <i className="fas fa-angle-double-left"></i>
          </div>
      <div
        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        className={`page-number ${currentPage === 1 ? "disabled" : ""}`}
      >
        <i className="fas fa-angle-left"></i>
        </div>
      {pageNumbers.map((number) => (
        <div
          key={number}
          onClick={() => paginate(number)}
          className={`page-number ${currentPage === number ? "isActive" : ""}`}
        >
          {number}
        </div>
      ))}
      <div
        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
        className={`page-number ${
          currentPage === totalPages ? "disabled" : ""
        }`}
      >
        <i className="fas fa-angle-right"></i>
      </div>
      <div
        onClick={() => currentPage < totalPages && paginate(totalPages)}
        className={`page-number ${
          currentPage === totalPages ? "disabled" : ""
        }`}
      >
          <i className="fas fa-angle-double-right"></i>
      </div>
    </div>
  );
};

export default Pagination;
