import { Grid } from "@material-ui/core";
import React from "react";
import BookingStepper from "../../components/Stepper/BookingStepper";

const Booking = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item md={12}>
        <BookingStepper />
      </Grid>
    </Grid>
  );
};

export default Booking;
