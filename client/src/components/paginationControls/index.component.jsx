import React from "react";
import { Pagination } from "./index.style";

const PaginationControls = ({ pagination, onPageChange }) => {
  const { totalPages, currentPage } = pagination;

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </Pagination>
  );
};

export default PaginationControls;
