import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel
} from "@tanstack/react-table";
import MOCK_DATA from "./Mock_Data.json";
import { Columns } from "./Columns";
import { useMemo, useState } from "react";
import PaginationButtons from "./PaginationButtons";
import FilterInput from "./FilterInput";

const Table = () => {
  const memoizedColumns = useMemo(() => Columns, []);
  const memoizedData = useMemo(() => MOCK_DATA, []);
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState('');

  const tableInstance = useReactTable({
    columns: memoizedColumns,
    data: memoizedData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter
  });

  return (
    <>
      <div className="overflow-x-auto bg-gray-100 dark:bg-gray-900">
        <div className="p-4">
          <FilterInput value={filter} setValue={setFilter} />
        </div>
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg divide-y divide-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:divide-gray-700">
          <thead className="bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    onClick={header.column.getToggleSortingHandler()}
                    key={header.id}
                    className="px-6 py-3 text-left cursor-pointer text-sm font-semibold uppercase tracking-wider border-b border-gray-300 hover:bg-gray-100 transition-colors duration-150 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-300"
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
                className="hover:bg-gray-50 transition-colors duration-200 dark:hover:bg-gray-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 flex justify-end">
        <PaginationButtons tableInstance={tableInstance} />
      </div>
    </>
  );
};

export default Table;
