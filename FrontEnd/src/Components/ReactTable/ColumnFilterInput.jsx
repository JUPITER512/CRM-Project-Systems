import React, { useEffect } from "react";
const ColumnFilterInput = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      Search :{" "}
      <input
        type="text"
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
    </span>
  );
};

export default ColumnFilterInput;
