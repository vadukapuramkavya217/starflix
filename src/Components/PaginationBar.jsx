import React from "react";
import "../Styles/PaginationBar.css";

const PaginationBar = ({
  currentPage,
  totalPages,
  moviesPerPage,
  setMoviesPerPage,
  handlePageChange,
}) => {
  // Generate visible pages (like 1,2,3,...,last)
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 3;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= maxVisible) {
        pages.push(1, 2, 3, "...", totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="pagination-bar">
      <div className="pagination-left">
        <label>Movies per page:</label>
        <select
          value={moviesPerPage}
          onChange={(e) => setMoviesPerPage(Number(e.target.value))}
        >
          <option value={10}>10 Movies</option>
          <option value={20}>20 Movies</option>
          <option value={50}>50 Movies</option>
        </select>
      </div>

      <div className="pagination-right">
        <span>
          Page {currentPage} of {totalPages}:
        </span>
        <div className="pagination-pages">
          {getVisiblePages().map((page, index) =>
            page === "..." ? (
              <span key={index} className="dots">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`page-btn ${
                  page === currentPage ? "active" : ""
                }`}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            className="arrow-btn"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationBar;
