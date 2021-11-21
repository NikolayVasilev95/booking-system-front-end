import React, { useState } from "react";
import {
  Button,
  Stepper,
  createStyles,
  makeStyles,
  Step,
  StepLabel,
  Theme,
  Grid,
  Container,
} from "@material-ui/core";
import { Employee } from "../../services/Employees/types";
import { Position } from "../../services/position/types";
import { newSchedule, updateSchedule } from "../../services/Schedule";
import { Schedule } from "../../services/Schedule/types";
import { Service } from "../../services/Service/types";
import { CustomAlert } from "../../utils/CustomAlert";
import SelectEmployee from "./SelectEmployee/SelectEmployee";
import SelectSchedule from "./SelectSchedule/SelectSchedule";
import SelectService from "./SelectService/SelectService";
import { format } from "date-fns";

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
  const [selectedPosition, setSelectedPosition] = useState<Position>();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [selectedServices, setSelectedServices] = useState<Service[]>();
  const [employeeName, setEmployeeName] = useState<string>();
  const [services, setServices] = useState<Service[]>();
  const [schedule, setSchedule] = useState<Schedule>();
  const [finishData, setFinishData] = useState<string>("");

  const steps = ["изберете служител", "изберете услуга", "резервирай час"];

  const handleSelectedPosition = (position: Position) => {
    setSelectedPosition(position);
  };

  const handleSelectedEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleServices = (services: Service[]) => {
    setServices(services);
  };

  const handleSelectedServices = (service: Service[]) => {
    setSelectedServices(service);
  };

  const handleSelectedSchedule = (schedule: Schedule) => {
    console.log(schedule);
    if (schedule) {
      newSchedule(schedule)
        .then(({ data }) => {
          console.log(data.result);
          if (data.status === "success") {
            const services = selectedServices
              ? selectedServices.map((service) => service.name).join(", ")
              : "";
            setFinishData(
              `Вашата резервация за ${services} от ${format(
                new Date(schedule.start),
                "d.MM.Y H:mm:ss"
              )} до ${format(
                new Date(schedule.end),
                "d.MM.Y H:mm:ss"
              )} е приета. Влезте си в ${
                schedule.email
              } за да потвърдите резервацията`
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <SelectEmployee
            handleSelectedEmployee={handleSelectedEmployee}
            handleSelectedPosition={handleSelectedPosition}
            handleServices={handleServices}
          />
        );
      case 1:
        return (
          services && (
            <SelectService
              services={services}
              handleSelectedServices={handleSelectedServices}
            />
          )
        );
      case 2:
        return (
          selectedEmployee && (
            <SelectSchedule
              employeeId={selectedEmployee?.id}
              handleSelectedSchedule={handleSelectedSchedule}
            />
          )
        );
      default:
        return <></>;
    }
  };

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            justifyContent="center"
          >
            {activeStep === steps.length ? (
              <>
                <Grid item sm={12} md={3}></Grid>
                <Grid item sm={12} md={6} className={classes.instructions}>
                  <CustomAlert
                    severity="success"
                    title="Успешно изпратена заявка за резервация"
                    data={finishData}
                  />
                </Grid>
                <Grid item sm={12} md={3}></Grid>
                <Button onClick={handleReset}>Reset</Button>
              </>
            ) : (
              <>
                <form autoComplete="off" onSubmit={(e) => handleNext(e)}>
                  <Grid item container className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Grid>
                </form>
              </>
            )}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default BookingStepper;
