import React from "react";
import { Grid } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import CustomTable from "../../../components/CustomTable/CustomTable";

const columns: GridColDef[] = [
  { field: "id", hide: true },
  { field: "name", headerName: "NAME", width: 170 },
  { field: "salonId", headerName: "SalonId", width: 170 },
];

export default function Positions() {
  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12}>
        <CustomTable columns={columns} entity={"Position"} />
      </Grid>
    </Grid>
  );
}
