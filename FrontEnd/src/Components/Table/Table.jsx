import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Columns } from "./Columns";
import { useMemo, useState } from "react";
import PaginationButtons from "./PaginationButtons";
import FilterInput from "./FilterInput";
import Query from "./FetchtableData";
import {
  tableDataState,
  paginationState,
  totalRows,
} from "../../Store/TableData";
import { useRecoilState, useRecoilValue } from "recoil";
import { ToastContainer } from "react-toastify";

const Table = () => {
  const { isLoading, isError, error } = Query();
  const totalRowsValue = useRecoilValue(totalRows);
  const tabledata = useRecoilValue(tableDataState);
  const [pagination, setPagination] = useRecoilState(paginationState);
  const memoizedColumns = useMemo(() => Columns, []);

  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");

  const tableInstance = useReactTable({
    columns: memoizedColumns, // Ensure this is memoized
    data: tabledata || [], // Fallback to an empty array if tabledata is undefined
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting, // Ensure sorting state is managed
      globalFilter: filter, // Global filter state
      pagination, // Pagination state
    },
    onSortingChange: setSorting, // Callback for sorting changes
    onGlobalFilterChange: setFilter, // Callback for global filter changes
    rowCount: totalRowsValue, // Total number of rows for pagination
    onPaginationChange: setPagination, // Callback for pagination changes
    autoResetPageIndex: false, // Prevent resetting page index on state changes
  });

  if (isLoading) {
    return (
      <div className="overflow-x-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Customer Data Table
          </h1>
          <FilterInput value={filter} setValue={setFilter} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 shadow-md divide-y divide-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:divide-gray-700">
            <thead className="bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      onClick={header.column.getToggleSortingHandler()}
                      key={header.id}
                      className="p-6 text-center text-sm font-medium uppercase tracking-wider cursor-pointer transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-gray-800 dark:text-gray-300">
              <tr className="text-center">
                <td colSpan={memoizedColumns.length} className="relative">
                  <div className="flex justify-center items-center h-full w-full">
                    <div className="loader"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  return (
    <>
      <ToastContainer />
      <div className="overflow-x-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Customer Data Table
          </h1>
          <FilterInput value={filter} setValue={setFilter} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 shadow-md divide-y divide-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:divide-gray-700">
            <thead className="bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      onClick={header.column.getToggleSortingHandler()}
                      key={header.id}
                      className="p-6 text-center text-sm font-medium uppercase tracking-wider cursor-pointer transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-gray-800 dark:text-gray-300">
              {tabledata.length > 0 ? (
                tableInstance.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-100 transition-colors duration-300 dark:hover:bg-gray-700"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="p-6 text-sm border-b border-gray-200 dark:border-gray-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={memoizedColumns.length}
                    className="p-6 text-center text-2xl font-bold text-gray-500 dark:text-gray-400"
                  >
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-4 flex justify-end bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
        <PaginationButtons tableInstance={tableInstance} />
      </div>
    </>
  );
};

export default Table;
