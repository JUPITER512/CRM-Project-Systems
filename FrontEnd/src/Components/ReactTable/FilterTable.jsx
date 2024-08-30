import { Columns } from "./Column";
import MOCK_DATA from "./data.json";
import { useMemo } from "react";
import { useTable ,useGlobalFilter , useFilters} from "react-table/dist/react-table.development";
import GlobalFilterInput from "./GlobalFilterInput";
import ColumnFilterInput from "./ColumnFilterInput";
const FilterTable = () => {
  const ColumnsMemo = useMemo(() => Columns, []);
  const MOCKDATA = useMemo(() => MOCK_DATA, []);
  const defaultCol=useMemo(()=>{
    return {
      Filter:ColumnFilterInput
    }
  },[])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    state,
    setGlobalFilter
  } = useTable({
    columns: ColumnsMemo,
    data: MOCKDATA,
    defaultColumn:defaultCol
  },useFilters,useGlobalFilter);
  const {globalFilter}=state
  return (
    <>
    <GlobalFilterInput filter={globalFilter} setFilter={setGlobalFilter}/>
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
                  return <th key={key} {...headerProps}>{col.render("Header")}
                  <div>{col.canFilter?col.render('Filter'):null}</div>
                  
                  </th>;
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
        </>
  );
};

export default FilterTable;
