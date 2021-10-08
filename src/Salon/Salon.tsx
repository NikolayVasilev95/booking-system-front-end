import {
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { allSalon } from "../services/salon";
// import { Salon } from "../services/salon/types";

const columns: GridColDef[] = [
  { field: "id", hide: true },
  { field: "name", headerName: "NAME", width: 170 },
  { field: "address", headerName: "Address", width: 170 },
];

export default function Salon() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    allSalon()
      .then(({ data }) => {
        console.log(data);
        setData(data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12}>
        <Card elevation={3}>
          <CardHeader
            action={
              <IconButton
                aria-label="new-record"
                onClick={() => history.push("/new-salon")}
              >
                <AddCircleIcon fontSize="large" />
              </IconButton>
            }
            title="Salon"
          />
          <CardContent>
            <DataGrid
              autoHeight
              rows={data}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[2, 5, 7]}
              pagination
              loading={loading}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
