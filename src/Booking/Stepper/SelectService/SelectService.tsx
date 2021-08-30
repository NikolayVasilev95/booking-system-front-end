import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Services } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
);

type Props = {
  handleSelectedServices: (name: string[]) => void;
};

const SelectService = ({ handleSelectedServices }: Props) => {
  const classes = useStyles();
  type Chekboxes = { [x: number]: boolean };
  const [state, setState] = useState<Chekboxes[]>([{ 0: false }]);
  const [services, setServices] = useState<Services[]>();
  useEffect(() => {
    interface ServicesResponse {
      result: Services[];
      status: string;
    }
    // axios
    //   .get<ServicesResponse>("http://localhost:8998/api/services/query")
    //   .then((response) => {
    //     console.log(response.data.result);
    //     setServices(response.data.result);
    //     const chekboxes = response.data.result.map((_, index) => ({
    //       [index]: false,
    //     }));
    //     console.log(chekboxes);

    //     setState(chekboxes);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);

    const newValue = state?.find(
      (el, index) =>
        //@ts-ignore
        Object.keys(el)[0] === event.target.name && {
          [event.target.name]: event.target.checked,
        }
    );
    console.log(newValue);
    if (newValue) {
      console.log(newValue);

      setState([
        //   ...state,
        newValue,
      ]);
      console.log(state);
    }
  };

  return (
    <>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          {services &&
            services?.length > 0 &&
            state &&
            services?.map((service, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    onChange={handleChange}
                    name={index.toString()}
                  />
                }
                label={service.name}
              />
            ))}
        </FormGroup>
      </FormControl>
    </>
  );
};

export default SelectService;
