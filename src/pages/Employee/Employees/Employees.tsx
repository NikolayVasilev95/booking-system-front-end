import React from "react";
import { Grid } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import CustomTable from "../../../components/CustomTable/CustomTable";
import CustomMouseOverPopover from "../../../utils/CustomMouseOverPopover";

const columns: GridColDef[] = [
  { field: "id", hide: true },
  { field: "firstName", headerName: "First Name", width: 170 },
  { field: "middleName", headerName: "Middle Name", width: 170 },
  { field: "lastName", headerName: "Last Name", width: 170 },
  {
    field: "img",
    headerName: "Image",
    width: 170,
    renderCell: (props) => (
      <CustomMouseOverPopover value={props.value?.toString() ?? ""}>
        <img src={props.value as string} alt={props.id.toString()} />
      </CustomMouseOverPopover>
    ),
  },
  { field: "description", headerName: "Description", width: 170 },
];

export default function Employees() {
  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12}>
        <CustomTable columns={columns} entity={"Employee"} />
      </Grid>
    </Grid>
  );
}
