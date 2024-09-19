import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Columns } from "./Columns";
import {  useMemo, useState } from "react";
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
    // console.log("Sorting", sorting);
    const [filter, setFilter] = useState("");
 

    const filteredData = useMemo(() => {
      return tabledata;
    }, [tabledata]);
    const tableInstance = useReactTable({
      columns: memoizedColumns, 
      data: filteredData, 

      getCoreRowModel: getCoreRowModel(), //This function is used to get the basic row structure for the table.
      getPaginationRowModel: getPaginationRowModel(), //This function handles the pagination
      getSortedRowModel: getSortedRowModel(), // This function manages the sorting of rows based on the column headers.
      getFilteredRowModel: getFilteredRowModel(), //  This function manages the filtering of rows based filter state

      state: {
        sorting, //sorting state
        globalFilter: filter, // Global filter state
        pagination, // Pagination state
      },

      onSortingChange: setSorting, // function for sorting changes
      onGlobalFilterChange: setFilter, // function for global filter changes
      rowCount: totalRowsValue, // Total number of rows of data
      onPaginationChange: setPagination, // function for pagination changes
      globalFilterFn:'includesString',
      autoResetPageIndex: false, // Prevent resetting page index on state changes
      
    });

    // console.log("Filter staet", filter);
    // console.log(tabledata)
  // console.log(tableInstance.getRowModel());
  // console.log("headers row", tableInstance.getHeaderGroups()[0].headers);
  // console.log("data rows", tableInstance.getRowModel().rows);
  if (isLoading) {
    return (
      <div className=" bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Customer Data Table
          </h1>
          <FilterInput tableInstance={tableInstance} value={filter} setValue={setFilter} />
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
  console.log("Table data" ,tabledata);
  console.log("Table data length ",tabledata.length)
  console.log(tableInstance.getState().globalFilter)
  return (
    <>
      <ToastContainer />
      <div className=" bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-2">
        <div className="flex justify-between items-center mb-4 flex-col md:flex-row ">
          <h1 className="text-xl text-center lg:text-left font-semibold text-gray-800 dark:text-gray-200">
            Customer Data Table
          </h1>
          <FilterInput value={filter} setValue={setFilter}/>
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
                          {
                          {asc: ' 🔼',desc: ' 🔽',}[header.column.getIsSorted()] ?? null }
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
      <div className="p-4 flex justify-center lg:justify-end bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
        <PaginationButtons tableInstance={tableInstance} />
      </div>
    </>
  );
};

export default Table;

// The flexRender function is used to render the headers in a way that accommodates various types of header definitions, such as strings, JSX, or functions returning those types. This utility ensures that the appropriate rendering logic is applied based on the header definition provided in the column configuration.
