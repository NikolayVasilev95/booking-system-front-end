import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Service } from "../../../services/Service/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { display: "flex" },
    formControl: { margin: theme.spacing(3) },
  })
);

type Chekboxes = { name: string; value: boolean };
type Props = {
  services: Service[];
  handleSelectedServices: (service: Service[]) => void;
};

const SelectService = ({ services, handleSelectedServices }: Props) => {
  const classes = useStyles();
  const [isCheckboxesChecked, setIsCheckboxesChecked] = useState<Chekboxes[]>();
  const [selectedService, setSelectedService] = useState<Service>();

  useEffect(() => {
    setIsCheckboxesChecked(
      services.map((service) => ({ name: service.name, value: false }))
    );
  }, [services]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIsCheckboxesCheckedState = isCheckboxesChecked?.map((checkbox) =>
      checkbox.name === event.target.name
        ? { name: checkbox.name, value: !checkbox.value }
        : checkbox
    );
    setIsCheckboxesChecked(newIsCheckboxesCheckedState);
    handleSelectedServices(
      services.filter(
        (service, index) =>
          service.name === newIsCheckboxesCheckedState?.[index].name &&
          newIsCheckboxesCheckedState?.[index].value
      )
    );
  };

  return (
    <>
      {services && (
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Услуги</FormLabel>
          <FormGroup>
            {services.map((service: Service, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCheckboxesChecked?.[index].value ?? false}
                    onChange={handleChange}
                    name={service.name}
                    key={service.id}
                  />
                }
                label={`${service.name} - ${service.price} лв.`}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}
    </>
  );
};

export default SelectService;
