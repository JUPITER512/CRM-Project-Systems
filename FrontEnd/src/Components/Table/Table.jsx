import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Columns } from "./Columns";
import { useEffect, useMemo, useState } from "react";
import PaginationButtons from "./PaginationButtons";
import FilterInput from "./FilterInput";
import { useQuery ,keepPreviousData} from "@tanstack/react-query";
import Axios from "@hooks/Axios";
import { useRecoilState } from "recoil";
import { TableData } from "../../Store/TableData";
const Table = () => {
  const memoizedColumns = useMemo(() => Columns, []);
  const  [value,setValue] = useRecoilState(TableData);
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const paginationValues = useMemo(
    () => ({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    }),
    [pagination.pageIndex, pagination.pageSize]
  );
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tabledata", pagination.pageIndex + 1,pagination.pageSize],
    queryFn: async () => {
      const response = await Axios({
        requestType: "get",
        url: `/get-customer?page=${paginationValues.pageIndex + 1}&limit=${paginationValues.pageSize}`,
      });
      if (response.status === 200) {
        setValue((prev) => {
          return [...prev, ...response.data.data];
        });
        return response.data;
      }
    },
    staleTime: 30000,
    keepPreviousData:true,
    placeholderData:keepPreviousData,
  });

  const tableInstance = useReactTable({
    columns: memoizedColumns,
    data: value.length==0 || [],
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
    onPaginationChange: setPagination,
    rowCount:data?.totalCustomers
  });
  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
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
