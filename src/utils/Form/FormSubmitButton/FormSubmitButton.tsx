import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({ margin: { margin: theme.spacing(1) } })
);

type Props = { size: "small" | "medium"; title: string };

export const FormSubmitButton = ({ size, title }: Props) => {
  const classes = useStyles();
  return (
    <FormControl size={size} className={classes.margin}>
      <Button type="submit" variant="contained">
        {title}
      </Button>
    </FormControl>
  );
};
