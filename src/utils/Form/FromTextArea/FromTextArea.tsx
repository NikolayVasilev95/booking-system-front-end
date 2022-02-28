import React from "react";
import { Control, Controller } from "react-hook-form";
import {
  TextField,
  makeStyles,
  Theme,
  createStyles,
  FormControl,
} from "@material-ui/core";

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
  isFullWidth: boolean;
  isRequired: boolean;
  minRows: number;
};

export const FormTextArea = ({
  name,
  control,
  labelId,
  label,
  isFullWidth,
  isRequired,
  minRows,
}: Props) => {
  const classes = useStyles();
  return (
    <FormControl
      fullWidth={isFullWidth}
      required={isRequired}
      className={classes.margin}
    >
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value}
            id={labelId}
            label={label}
            variant="outlined"
            multiline
            minRows={minRows}
            // rows={4}
          />
        )}
      />
    </FormControl>
  );
};
