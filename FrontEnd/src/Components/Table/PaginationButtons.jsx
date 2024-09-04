const PaginationButtons = ({ tableInstance }) => {
  return (
<>
<div className="flex items-center space-x-2">
      <select
        value={tableInstance.getState().pagination.pageSize}
        onChange={(e) => {
          tableInstance.setPageSize(Number(e.target.value));
        }}
        className="px-3 py-1 border border-gray-300 rounded-lg shadow-sm transition duration-150 ease-in-out dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>

      <button
        onClick={() => {
          tableInstance.setPageIndex(0);
        }}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
      >
        {"First Page"}
      </button>

      <button
        disabled={!tableInstance.getCanPreviousPage()}
        onClick={() => {
          tableInstance.previousPage();
        }}
        className={`px-4 py-2 rounded-lg shadow-md transition duration-150 ease-in-out ${
          tableInstance.getCanPreviousPage()
            ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400 dark:cursor-not-allowed"
        }`}
      >
        Previous
      </button>
                <strong>{tableInstance.getState().pagination.pageIndex + 1} of{" "} {tableInstance.getPageCount()}</strong>

      <button
        disabled={!tableInstance.getCanNextPage()}
        onClick={() => {
          tableInstance.setPageIndex(tableInstance.getPageCount() - 1);
        }}
        className={`px-4 py-2 bg-transparent rounded-xl shadow-md transition duration-150 ease-in-out cursor-pointer`}
      >
        {tableInstance.getPageCount()}
      </button>
      <button
        disabled={!tableInstance.getCanNextPage()}
        onClick={() => {
          tableInstance.nextPage();
        }}
        className={`px-4 py-2 rounded-lg shadow-md transition duration-150 ease-in-out ${
          tableInstance.getCanNextPage()
            ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400 dark:cursor-not-allowed"
        }`}
      >
        Next
      </button>

      <button
        onClick={() => {
          tableInstance.setPageIndex(tableInstance.getPageCount() - 1);
        }}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
      >
        {"Last Page"}
      </button>


    </div>
</>
  );
};

export default PaginationButtons;
