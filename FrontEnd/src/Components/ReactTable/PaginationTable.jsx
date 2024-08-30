import { Columns } from "./Column";
import MOCK_DATA from "./data.json";
import { useMemo } from "react";
import {
  useTable,
  usePagination,
} from "react-table/dist/react-table.development";

const PaginationTable = () => {
  const ColumnsMemo = useMemo(() => Columns, []);
  const MOCKDATA = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    setPageSize,
    pageCount,
  } = useTable(
    {
      columns: ColumnsMemo,
      data: MOCKDATA,
    },
    usePagination
  );

  const { pageIndex,pageSize } = state;

  return (
    <>
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200"
        >
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup) => {
              const { key, ...headerGroupProps } =
                headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...headerGroupProps}>
                  {headerGroup.headers.map((col) => {
                    const { key, ...headerProps } = col.getHeaderProps();
                    return (
                      <th
                        key={key}
                        {...headerProps}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {col.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {page.map((row) => {
              prepareRow(row);
              const { key, ...rowProps } = row.getRowProps();
              return (
                <tr key={key} {...rowProps} className="hover:bg-gray-100">
                  {row.cells.map((cell) => {
                    const { key, ...cellProps } = cell.getCellProps();
                    return (
                      <td
                        key={key}
                        {...cellProps}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-700">
          Page {pageIndex + 1} of {pageOptions.length}
        </span>

        <div>
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md disabled:bg-gray-300"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md disabled:bg-gray-300"
          >
            Previous
          </button>

          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md ml-2 disabled:bg-gray-300"
          >
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md disabled:bg-gray-300"
          >
            {">>"}
          </button>
          <select name="" id="" value={pageSize} onChange={e=>setPageSize(Number(e.target.value))}>
            {
                [10,25,50].map(item=><option key={item} onClick={()=>{setPageSize(item)}}>{item}</option>)
            }
          </select>
        </div>
      </div>
    </>
  );
};

export default PaginationTable;
