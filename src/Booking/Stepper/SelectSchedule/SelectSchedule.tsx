import React from "react";
import { Schedules } from "../types";
import {
  Calendar,
  CalendarProps,
  momentLocalizer,
  SlotInfo,
  stringOrDate,
} from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import {
  Button,
  createStyles,
  FormControl,
  FormHelperText,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";

const localizer = momentLocalizer(moment);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      flexGrow: 1,
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
    root: {
      padding: theme.spacing(3, 2),
    },
    margin: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

type Props = {
  schedules: Schedules;
};

type SelectedEventForCreat = {
  start: stringOrDate;
  end: stringOrDate;
};
const SelectSchedule = () => {
  const classes = useStyles();
  const [isOpenCreatEventModal, setIsOpenCreatEventModal] = useState(false);
  const [selectedEventForCreat, setSelectedEventForCreat] =
    useState<SelectedEventForCreat>();

  const myEventsList = [
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Some title",
    },
  ];
  const openCreatEventModal = () => {
    return (
      <>
        {isOpenCreatEventModal && (
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1000,
              padding: ".8em",
            }}
          >
            <Paper
              elevation={3}
              className={classes.root}
              style={{ width: "50%", textAlign: "center" }}
            >
              <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="outlined"
                >
                  <TextField
                    disabled
                    label="начало"
                    variant="outlined"
                    name="начало"
                    defaultValue={selectedEventForCreat?.start}
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="outlined"
                >
                  <TextField
                    disabled
                    label="край"
                    variant="outlined"
                    name="край"
                    defaultValue={selectedEventForCreat?.end}
                  />
                </FormControl>
                <FormControl size="medium" className={classes.margin}>
                  <FormHelperText>
                    asdfsadasdasd asdfasdf asdfasdf
                  </FormHelperText>
                </FormControl>
                <FormControl size="medium" className={classes.margin}>
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={facebook}
                  >
                    {/* <FacebookIcon fontSize="small" /> */}
                    facebook
                  </Button>
                </FormControl>
                <FormControl size="medium" className={classes.margin}>
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={google}
                  >
                    google
                  </Button>
                </FormControl>
                <FormControl size="medium" className={classes.margin}>
                  <Button type="submit" variant="contained">
                    Запазване
                  </Button>
                </FormControl>
              </form>
            </Paper>
          </Grid>
        )}
      </>
    );
  };

  const handleSelect = ({ start, end }: SlotInfo) => {
    console.log(start);
    console.log(end);
    setSelectedEventForCreat({ start, end });
    setIsOpenCreatEventModal(!isOpenCreatEventModal);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
    setIsOpenCreatEventModal(!isOpenCreatEventModal);
  };

  const facebook = () => {
    console.log("tyk");
  };

  const google = () => {
    console.log("tyk");
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <Calendar
          selectable={true}
          localizer={localizer}
          events={myEventsList}
          defaultView="week"
          startAccessor="start"
          endAccessor="end"
          // onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={handleSelect}
          style={{ height: 500 }}
        />
        {openCreatEventModal()}
      </div>
    </>
  );
};

export default SelectSchedule;
