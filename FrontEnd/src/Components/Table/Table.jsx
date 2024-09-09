import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Columns } from "./Columns";
import {useMemo, useState,useEffect } from "react";
import PaginationButtons from "./PaginationButtons";
import FilterInput from "./FilterInput";

import Query from './FetchtableData'
import { tableDataState, paginationState} from "../../Store/TableData";
import { useRecoilState, useRecoilValue } from "recoil";

const Table = () => {
  const{data,isLoading,isError,error} =Query()
  const tabledata=useRecoilValue(tableDataState);
  const [pagination,setPagination]=useRecoilState(paginationState)
  const memoizedColumns = useMemo(() => Columns, []);

  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");

  const tableInstance = useReactTable({
    columns: memoizedColumns,
    data: tabledata || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    rowCount:data?.totalCustomers,
    onPaginationChange: setPagination,
  });
  if(isLoading){
    return <div>Loading.....</div>
  }
  if(isError){
    return <div>Error {error.message}</div>
  }
  return (
    <>
      <div className="overflow-x-auto bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Data Table
          </h1>
          <FilterInput value={filter} setValue={setFilter} />
        </div>
        <table className="w-full bg-white border border-gray-200 shadow-md divide-y divide-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:divide-gray-700">
          <thead className="bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-200 ">
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
            {tableInstance.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-100 transition-colors duration-300 dark:hover:bg-gray-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-6 text-sm border-b border-gray-200 dark:border-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 flex justify-end bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
        <PaginationButtons tableInstance={tableInstance} />
      </div>
    </>
  );
};

export default Table;
