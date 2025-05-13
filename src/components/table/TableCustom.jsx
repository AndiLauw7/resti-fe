/* eslint-disable no-unused-vars */
import React from "react";
import { MaterialReactTable } from "material-react-table";

const TableCustom = (props) => {
  const { columns = [], data = [] } = props;
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      muiTableContainerProps={{
        sx: {
          maxHeight: "63vh",
          overflowY: "auto",
          overflowX: "auto",
        },
      }}
      {...props}
    />
  );
};

export default TableCustom;
