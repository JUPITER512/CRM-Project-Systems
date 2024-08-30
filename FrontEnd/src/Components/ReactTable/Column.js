import ColumnFilterInput from "./ColumnFilterInput"
export const Columns = [
    {
      Header: "ID",
      accessor: "id",
      Footer:"ID"    },
    {
      Header: "Name",
      Footer:"Name",
      accessor: "Name",
    },
    {
      Header: "Email",
      Footer:"Email",
      accessor: "Email",
    },
    {
      Header: "Contact", // Changed from `Contact` to `Header`
      accessor: "Contact",
      Footer:"Contact",
    },
    {
      Header: "Country", // Changed from `Country` to `Header`
      accessor: "Country",
      Footer:"Country",
    },
    {
      Header: "Status", // Changed from `Status` to `Header`
      accessor: "Status",
      Footer:"Status",
    },
  ];
  export const GroupedCols=[
      {
        Header: "ID",
        accessor: "id",
        Footer:"ID"
      },
      {
        Header: "Name",
        Footer:"Name",
        accessor: "Name",
      },
      {
        Header:"ContactInfo",
        Footer:"ContactInfo",
        columns:[
          {
            Header: "Email",
            Footer:"Email",
            accessor: "Email",
          },
          {
            Header: "Contact", // Changed from `Contact` to `Header`
            accessor: "Contact",
            Footer:"Contact"
          },
        ]
      },
      {
        Header:"Info",
        Footer:"Info",
        columns:[
          {
            Header: "Country", // Changed from `Country` to `Header`
            accessor: "Country",
            Footer:"Country"
          },
          {
            Header: "Status", // Changed from `Status` to `Header`
            accessor: "Status",
            Footer:"Status"
          },
        ]
      }
  ]