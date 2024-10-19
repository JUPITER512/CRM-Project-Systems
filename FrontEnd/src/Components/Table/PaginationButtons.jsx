const PaginationButtons = ({ tableInstance, setFilter }) => {
  const {
    getState,
    previousPage,
    nextPage,
    getCanPreviousPage,
    getCanNextPage,
    setPageSize,
    getPageCount,
  } = tableInstance;
  const { pagination } = getState();
  const pageCount = getPageCount();

  return (
    <div className="flex items-center flex-row gap-4 space-x-2">
      <select
        value={pagination.pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="px-3 py-1 border border-gray-300 rounded-lg shadow-sm transition-colors duration-150 ease-in-out dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-blue-500 text-sm sm:text-base"
      >
        {[10, 20, 30].map((size) => (
          <option key={size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
      <div className="flex items-center justify-center gap-2">
        {/* <button
          disabled={!getCanPreviousPage()}
          onClick={() => setPageIndex(0)}
          className={`px-4 py-2 rounded-lg shadow-md transition-colors duration-150 ease-in-out text-sm sm:text-base ${
            getCanPreviousPage()
              ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400 dark:cursor-not-allowed"
          }`}
        >
          First
        </button> */}

        <button
          disabled={!getCanPreviousPage()}
          onClick={() => {
            previousPage();
            setFilter("");
          }}
          className={`px-4 py-2 rounded-lg shadow-md transition-colors duration-150 ease-in-out text-sm sm:text-base ${
            getCanPreviousPage()
              ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400 dark:cursor-not-allowed"
          }`}
        >
          Prev
        </button>
      </div>

      <span className="px-2 text-sm sm:text-base">
        <strong>
          Page {pagination.pageIndex + 1} of {pageCount}
        </strong>
      </span>

      <div className="flex items-center justify-center gap-2">
        <button
          disabled={!getCanNextPage()}
          onClick={() => {
            nextPage();
            setFilter("");
          }}
          className={`px-4 py-2 rounded-lg shadow-md transition-colors duration-150 ease-in-out text-sm sm:text-base ${
            getCanNextPage()
              ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400 dark:cursor-not-allowed"
          }`}
        >
          Next
        </button>

        {/* <button
          disabled={!getCanNextPage()}
          onClick={() => setPageIndex(pageCount - 1)}
          className={`px-4 py-2 rounded-lg shadow-md transition-colors duration-150 ease-in-out text-sm sm:text-base ${
            getCanNextPage()
              ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400 dark:cursor-not-allowed"
          }`}
        >
          Last
        </button> */}
      </div>
    </div>
  );
};

export default PaginationButtons;
