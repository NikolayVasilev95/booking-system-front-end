import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Employees, Positions, Services } from "../types";
import { CardMedia, NativeSelect, Paper, Typography } from "@material-ui/core";
import { allPosition } from "../../../services/position";
import { Position } from "../../../services/position/types";
import { Employee } from "../../../services/Employees";
import { Service } from "../../../services/Service/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      width: "100%",
      height: "100%",
      textAlign: "center",
    },
    formControl: {
      marginBottom: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

type Props = {
  handleSelectedEmployee: (emoloyee: Employee) => void;
  handleSelectedPosition: (position: Position) => void;
  handleServices: (services: Service[]) => void;
};

const SelectEmployee = ({
  handleSelectedEmployee,
  handleSelectedPosition,
  handleServices,
}: Props) => {
  const classes = useStyles();
  const [selectedPosition, setSelectedPosition] = useState<Position>();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [positions, setPositions] = useState<Position[]>();
  const [employees, setEmployees] = useState<Employee[]>();

  useEffect(() => {
    // allPosition({ name: "Бръснар" })
    allPosition()
      .then(({ data }) => {
        console.log(data);
        setPositions(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangePosition = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const position = positions?.find(
      (position) => position.name === (event.target.value as string)
    );
    if (position) {
      setSelectedPosition(position);
      handleSelectedPosition(position);
      allPosition({ name: event.target.value })
        .then(({ data }) => {
          console.log(data);
          setEmployees(data.result[0].Employees);
          data.result[0].Services && handleServices(data.result[0].Services);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChangeEmployee = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const employee = employees?.find(
      (employee) => employee.firstName === (event.target.value as string)
    );
    if (employee) {
      setSelectedEmployee(employee);
      handleSelectedEmployee(employee);
    }
  };

  return (
    <>
      <Paper elevation={3} className={classes.root}>
        {positions && (
          <FormControl fullWidth required className={classes.formControl}>
            <InputLabel id="position">Позиция</InputLabel>
            <Select
              labelId="position"
              id="position-required"
              value={selectedPosition?.name ?? ""}
              onChange={handleChangePosition}
              className={classes.selectEmpty}
            >
              {positions.map((position: Position) => (
                <MenuItem key={position.id} value={position.name}>
                  {position.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {selectedPosition && (
          <FormControl fullWidth required className={classes.formControl}>
            <InputLabel id="employee">Име на служителя</InputLabel>
            <Select
              labelId="employee"
              id="employee-required"
              value={selectedEmployee?.firstName ?? ""}
              onChange={handleChangeEmployee}
              className={classes.selectEmpty}
            >
              {employees?.map((employee: Employee) => (
                <MenuItem key={employee.id} value={employee.firstName}>
                  {`${employee.firstName} ${employee.middleName} ${employee.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {selectedEmployee && (
          <>
            <CardMedia
              style={{
                height: 0,
                paddingTop: "56.25%",
              }}
              image={selectedEmployee?.img}
              title="Paella dish"
            />

            <FormControl fullWidth required className={classes.formControl}>
              <Typography paragraph={true}>
                {selectedEmployee?.description}
              </Typography>
            </FormControl>
          </>
        )}
      </Paper>
    </>
  );
};

export default SelectEmployee;
