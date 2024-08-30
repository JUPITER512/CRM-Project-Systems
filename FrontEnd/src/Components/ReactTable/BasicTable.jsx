import { Columns } from "./Column";
import MOCK_DATA from "./data.json";
import { useMemo } from "react";
import { useTable } from "react-table/dist/react-table.development";
import "./Basictable.css";

const BasicTable = () => {
  const ColumnsMemo = useMemo(() => Columns, []);
  const MOCKDATA = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = useTable({
    columns: ColumnsMemo,
    data: MOCKDATA,
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
          // Destructure key from the spread props
          const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
          return (
            <tr key={key} {...headerGroupProps}>
              {headerGroup.headers.map((col) => {
                // Destructure key from the spread props
                const { key, ...headerProps } = col.getHeaderProps();
                return <th key={key} {...headerProps}>{col.render("Header")}</th>;
              })}
            </tr>
          );
        })}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          // Destructure key from the spread props
          const { key, ...rowProps } = row.getRowProps();
          return (
            <tr key={key} {...rowProps}>
              {row.cells.map((cell) => {
                // Destructure key from the spread props
                const { key, ...cellProps } = cell.getCellProps();
                return <td key={key} {...cellProps}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>

      <tfoot>
        {footerGroups.map((footerGroup) => {
          // Destructure key from the spread props
          const { key, ...footerGroupProps } = footerGroup.getFooterGroupProps();
          return (
            <tr key={key} {...footerGroupProps}>
              {footerGroup.headers.map((col) => {
                const { key, ...footerProps } = col.getFooterProps();
                return <td key={key} {...footerProps}>{col.render("Footer")}</td>;
              })}
            </tr>
          );
        })}
      </tfoot>
    </table>
  );
};

export default BasicTable;
