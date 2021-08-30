import { Button } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <p>Home</p>
      <NavLink to="/booking">
        <Button variant="contained" color="primary">
          Booking
        </Button>
      </NavLink>
    </>
  );
};

export default Home;
