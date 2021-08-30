import { Grid } from "@material-ui/core";
import React from "react";
import BookingStepper from "./Stepper/BookingStepper";

const Booking = () => {
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item>
        <BookingStepper />
      </Grid>
    </Grid>
  );
};

export default Booking;
