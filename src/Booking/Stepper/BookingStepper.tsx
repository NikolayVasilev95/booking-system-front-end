import {
  Button,
  Stepper,
  createStyles,
  makeStyles,
  Step,
  StepLabel,
  Theme,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Employee } from "../../services/Employees";
import { Position } from "../../services/position/types";
import SelectEmployee from "./SelectEmployee/SelectEmployee";
import SelectSchedule from "./SelectSchedule/SelectSchedule";
import SelectService from "./SelectService/SelectService";
import { Employees, Positions, Schedules, Services } from "./types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

const BookingStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [employeeName, setEmployeeName] = useState<string>();
  const [service, setService] = useState<Services[]>();
  const [schedule, setSchedule] = useState<Schedules>();
  const steps = ["изберете служител", "изберете услуга", "резервирай час"];

  const handleSelectedPosition = (position: Position) => {
    console.log(position);
  };

  const handleSelectedEmployee = (employee: Employee) => {
    console.log(employee);
  };

  const handleSelectedServices = (name: string[]) => {
    console.log(name);
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <SelectEmployee
            handleSelectedEmployee={handleSelectedEmployee}
            handleSelectedPosition={handleSelectedPosition}
          />
        );
      case 1:
        return (
          <SelectService handleSelectedServices={handleSelectedServices} />
        );
      case 2:
        return <SelectSchedule />;
      default:
        return <></>;
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Container>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            {activeStep === steps.length ? (
              <>
                <Grid item className={classes.instructions}>
                  All steps completed
                </Grid>
                <Button onClick={handleReset}>Reset</Button>
              </>
            ) : (
              <>
                <Grid item container className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Grid>
                <Grid item>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default BookingStepper;
