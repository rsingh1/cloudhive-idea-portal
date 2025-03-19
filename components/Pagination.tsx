'use client';

import { useState } from 'react';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages?: number;
}

export const Pagination = ({ page, setPage, totalPages = 10 }: PaginationProps) => {
  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className="px-4 py-2 action-button text-white rounded disabled:bg-gray-300"
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="px-4 py-2 action-button text-white rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};