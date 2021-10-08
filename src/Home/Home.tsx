import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 170 },
  { field: "name", headerName: "NAME", width: 170 },
  { field: "age", headerName: "AGE", width: 170 },
];

const rows = [
  { id: 1, name: "Gourav", age: 12 },
  { id: 2, name: "Geek", age: 43 },
  { id: 3, name: "Pranav", age: 41 },
  { id: 4, name: "Abhay", age: 34 },
  { id: 5, name: "Pranav", age: 73 },
  { id: 6, name: "Disha", age: 61 },
  { id: 7, name: "Raghav", age: 72 },
  { id: 8, name: "Amit", age: 24 },
  { id: 9, name: "Anuj", age: 48 },
];

interface TestData {
  id: number;
  name: string;
  age: number;
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState<TestData[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData(rows);
    }, 3000);
  }, []);
  return (
    <>
      <p>Home</p>
      <Grid container>
        <Grid item sm={12} md={3}></Grid>
        <Grid item sm={12} md={6}>
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
        </Grid>
        <Grid item sm={12} md={3}></Grid>
      </Grid>
      <NavLink to="/booking">
        <Button variant="contained" color="primary">
          Booking
        </Button>
      </NavLink>
    </>
  );
};

export default Home;
