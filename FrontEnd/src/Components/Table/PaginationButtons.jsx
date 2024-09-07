import React from 'react';

const PaginationButtons = ({ tableInstance }) => {
  const { getState, setPageSize, setPageIndex, previousPage, nextPage, getCanPreviousPage, getCanNextPage, getPageCount } = tableInstance;
  const { pagination } = getState();
  const pageCount = getPageCount();
  
  return (
    <div className="flex items-center space-x-2">
      {/* Page Size Selector */}
      <select
        value={pagination.pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="px-3 py-1 border border-gray-300 rounded-lg shadow-sm transition-colors duration-150 ease-in-out dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {[10, 20, 30, 40, 50].map((size) => (
          <option key={size} value={size}>
            {size} per page
          </option>
        ))}
      </select>

      {/* First Page Button */}
      <button
        onClick={() => setPageIndex(0)}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-150 ease-in-out dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
      >
        First
      </button>

      {/* Previous Page Button */}
      <button
        disabled={!getCanPreviousPage()}
        onClick={previousPage}
        className={`px-4 py-2 rounded-lg shadow-md transition-colors duration-150 ease-in-out ${
          getCanPreviousPage()
            ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400 dark:cursor-not-allowed"
        }`}
      >
        Prev
      </button>

      {/* Page Indicator */}
      <span className="px-2">
        <strong>
          {pagination.pageIndex + 1} of {pageCount}
        </strong>
      </span>

      {/* Next Page Button */}
      <button
        disabled={!getCanNextPage()}
        onClick={nextPage}
        className={`px-4 py-2 rounded-lg shadow-md transition-colors duration-150 ease-in-out ${
          getCanNextPage()
            ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400 dark:cursor-not-allowed"
        }`}
      >
        Next
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => setPageIndex(pageCount - 1)}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-150 ease-in-out dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
      >
        Last
      </button>
    </div>
  );
};

export default PaginationButtons;
