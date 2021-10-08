import {
  Button,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  FormControl,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import { newSalon } from "../services/salon";
import { Salon } from "../services/salon/types";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CustomAlert } from "../utils/CustomAlert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  })
);

export default function NewSalon() {
  const classes = useStyles();
  const [alertData, setAlertData] = useState<{
    data: string;
    severity: "success" | "info" | "warning" | "error";
  }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Salon>({
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const onSubmit = async (data: Salon) => {
    console.log(data);

    newSalon(data)
      .then(({ data }) => {
        console.log(data);
        if (data.status === "success")
          setAlertData({ data: "Успешено запазвано", severity: "success" });
      })
      .catch((error) => {
        console.log(error);
        setAlertData({ data: error, severity: "error" });
      });
  };

  return (
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <Grid item sm={12} md={4} lg={4}></Grid>
      <Grid item sm={12} md={4} lg={4}>
        <Card elevation={3}>
          <CardHeader title="Salon" />
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ textAlign: "center" }}
          >
            <CardContent>
              <FormControl fullWidth className={classes.margin}>
                <TextField
                  label="name"
                  variant="outlined"
                  {...register("name")}
                />
              </FormControl>
              <FormControl fullWidth className={classes.margin}>
                <TextField
                  label="addres"
                  variant="outlined"
                  {...register("address")}
                />
              </FormControl>
              <FormControl size="medium" className={classes.margin}>
                <Button type="submit" variant="contained">
                  Запазване
                </Button>
              </FormControl>
            </CardContent>
            {alertData && (
              <CardContent>
                <CustomAlert
                  severity={alertData.severity}
                  data={alertData.data}
                />
              </CardContent>
            )}
          </form>
        </Card>
      </Grid>
      <Grid item sm={12} md={4} lg={4}></Grid>
    </Grid>
  );
}
