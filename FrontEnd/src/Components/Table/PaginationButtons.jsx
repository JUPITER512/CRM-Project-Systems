const PaginationButtons = ({ tableInstance }) => {
  const { getState, setPageSize, setPageIndex, previousPage, nextPage, getCanPreviousPage, getCanNextPage, getPageCount } = tableInstance;
  const { pagination } = getState();
  const pageCount = getPageCount();

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <select
        value={pagination.pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="px-3 py-1 border border-gray-300 rounded-lg shadow-sm transition-colors duration-150 ease-in-out dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-blue-500 text-sm sm:text-base"
      >
        {[10, 20, 30, 40, 50].map((size) => (
          <option key={size} value={size}>
            {size} per page
          </option>
        ))}
      </select>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => setPageIndex(0)}
          className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-150 ease-in-out dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 text-sm sm:text-base"
        >
          First
        </button>

        <button
          disabled={!getCanPreviousPage()}
          onClick={previousPage}
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-md transition-colors duration-150 ease-in-out text-sm sm:text-base ${
            getCanPreviousPage()
              ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400 dark:cursor-not-allowed"
          }`}
        >
          Prev
        </button>

        <span className="px-2 text-sm sm:text-base">
          <strong>
            {pagination.pageIndex + 1} of {pageCount}
          </strong>
        </span>

        <button
          disabled={!getCanNextPage()}
          onClick={() => nextPage()}
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-md transition-colors duration-150 ease-in-out text-sm sm:text-base ${
            getCanNextPage()
              ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400 dark:cursor-not-allowed"
          }`}
        >
          Next
        </button>

        <button
          onClick={() => setPageIndex(pageCount - 1)}
          className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-150 ease-in-out dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 text-sm sm:text-base"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default PaginationButtons;
