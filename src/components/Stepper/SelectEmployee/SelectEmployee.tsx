import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { CardMedia, Paper, Typography } from "@material-ui/core";
import { allPosition } from "../../../services/position";
import { Position } from "../../../services/position/types";
import { Employee } from "../../../services/Employees/types";
import { Service } from "../../../services/Service/types";
import { allSalon } from "../../../services/salon";
import { Salon } from "../../../services/salon/types";
import { allEmployee } from "../../../services/Employees";

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
  const [selectedSalon, setSelectedSalon] = useState<Salon>();
  const [selectedPosition, setSelectedPosition] = useState<Position>();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const [salons, setSalons] = useState<Salon[]>();
  const [positions, setPositions] = useState<Position[]>();
  const [employees, setEmployees] = useState<Employee[]>();

  useEffect(() => {
    allSalon()
      .then(({ data }) => {
        console.log(data);
        setSalons(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
    allPosition()
      .then(({ data }) => {
        console.log(data);
        setPositions(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedSalon && selectedPosition) {
      allEmployee({
        salonId: selectedSalon.id,
        positionId: selectedPosition.id,
      })
        .then(({ data }) => {
          setEmployees(data.result);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedSalon, selectedPosition]);

  const handleChangeSalon = (event: React.ChangeEvent<{ value: unknown }>) => {
    const salon = salons?.find(
      (salon) => salon.name === (event.target.value as string)
    );
    if (salon) {
      setSelectedSalon(salon);
      //   // handleSelectedSalon(salon);
    }
  };

  const handleChangePosition = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const position = positions?.find(
      (position) => position.name === (event.target.value as string)
    );
    if (position) {
      setSelectedPosition(position);
      handleSelectedPosition(position);
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
        {salons && positions && (
          <>
            <FormControl fullWidth required className={classes.formControl}>
              <InputLabel id="salon">salons</InputLabel>
              <Select
                labelId="salon"
                id="position-required"
                value={selectedSalon?.name ?? ""}
                onChange={handleChangeSalon}
                className={classes.selectEmpty}
              >
                {salons.map((salon) => (
                  <MenuItem key={salon.id} value={salon.name}>
                    {salon.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          </>
        )}
        {employees && (
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
