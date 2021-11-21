import React from "react";
import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import { Controller, Control } from "react-hook-form";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: { margin: theme.spacing(1) },
    selectEmpty: { marginTop: theme.spacing(2) },
  })
);

type Props = {
  name: string;
  control: Control<any, object>;
  labelId: string;
  label: string;
  options: JSX.Element[];
  isFullWidth: boolean;
  isRequired: boolean;
};

export const FormInputDropdown = ({
  name,
  control,
  labelId,
  label,
  options,
  isRequired,
  isFullWidth,
}: Props) => {
  const classes = useStyles();
  return (
    <FormControl
      fullWidth={isFullWidth}
      required={isRequired}
      className={classes.margin}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select
            labelId={labelId}
            id={`${labelId}-select`}
            onChange={onChange}
            value={value}
            className={classes.selectEmpty}
          >
            <MenuItem key={0} value={0} disabled>
              izberi stoinost
            </MenuItem>
            {options}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
