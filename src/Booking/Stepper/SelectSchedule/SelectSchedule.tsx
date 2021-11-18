import React, { useEffect, useState } from "react";
import { Schedule } from "../../../services/Schedule/types";
import {
  Calendar,
  CalendarProps,
  momentLocalizer,
  SlotInfo,
  stringOrDate,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import {
  Button,
  createStyles,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Facebook } from "@material-ui/icons";
import { allCalendar } from "../../../services/Calendar";
import GoogleIcon from "../../../utils/CustomIcons/GoogleIcon";
import {
  firebaseFacebookAuth,
  firebaseGoogleAuth,
} from "../../../services/auth/firebase";

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

type SelectedEventForCreat = {
  start: stringOrDate;
  end: stringOrDate;
};

type Props = {
  employeeId: number | undefined;
  handleSelectedSchedule: (schedule: Schedule) => void;
};

const SelectSchedule = ({ employeeId, handleSelectedSchedule }: Props) => {
  const classes = useStyles();
  const [isOpenCreatEventModal, setIsOpenCreatEventModal] = useState(false);
  const [selectedEventForCreat, setSelectedEventForCreat] =
    useState<SelectedEventForCreat>();

  const [schedules, setSchedules] = useState<
    {
      start: Date;
      end: Date;
      title: string;
    }[]
  >();

  const [calendarId, setCalendarId] = useState<number>();
  const [client, setClient] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
  }>();

  const [phone, setPhone] = useState<string>();
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    allCalendar({ id: employeeId && employeeId })
      .then(({ data }) => {
        console.log(data);
        setCalendarId(data.result[0].id);
        setSchedules(
          data.result[0].Schedules.map(({ status, start, end }) => ({
            start: new Date(start),
            end: new Date(end),
            title: status,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormData = () => {
    if (selectedEventForCreat && phone && email && calendarId) {
      if (client) {
        handleSelectedSchedule({
          start: selectedEventForCreat.start.toString(),
          end: selectedEventForCreat.end.toString(),
          status: "още неуредена",
          phone,
          calendarId,
          email: client.email,
          firstName: client.firstName,
          lastName: client.lastName,
          picture: client.picture,
        });
      } else {
        handleSelectedSchedule({
          calendarId,
          start: selectedEventForCreat.start.toString(),
          end: selectedEventForCreat.end.toString(),
          status: "още неуредена",
          phone,
          email,
        });
      }
    }
  };

  // const myEventsList = [
  //   {
  //     start: moment().toDate(),
  //     end: moment().add(1, "days").toDate(),
  //     title: "Some title",
  //   },
  // ];
  const openCreatEventModal = () => {
    return (
      <>
        {isOpenCreatEventModal && (
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              padding: ".8em",
              width: "60%",
            }}
          >
            <Paper
              elevation={3}
              className={classes.root}
              style={{ width: "100%", textAlign: "center" }}
            >
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
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <PhoneInput
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                  inputStyle={{ width: "100%" }}
                  onlyCountries={["us", "bg"]}
                  country={"bg"}
                  placeholder="etaaw"
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                />
              </FormControl>
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <TextField
                  label="email"
                  variant="outlined"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value as string)}
                  required
                />
              </FormControl>
              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <TextField
                  label="Multiline"
                  variant="outlined"
                  name="Multiline"
                  multiline
                  minRows={2}
                  maxRows={3}
                />
              </FormControl>
              <FormControl size="medium" className={classes.margin}>
                <FormHelperText>asdfsadasdasd asdfasdf asdfasdf</FormHelperText>
              </FormControl>
              <Grid container>
                <Grid item sm={5} md={5}>
                  <IconButton
                    aria-label="facebook"
                    color="primary"
                    onClick={facebook}
                    disabled={client ? true : false}
                  >
                    <Facebook style={{ fontSize: 30 }} />
                  </IconButton>
                </Grid>
                <Grid item sm={2} md={2}>
                  <Typography style={{ fontSize: 30 }}>or</Typography>
                </Grid>
                <Grid item sm={5} md={5}>
                  <IconButton
                    aria-label="google"
                    color="primary"
                    onClick={google}
                    disabled={client ? true : false}
                  >
                    <GoogleIcon style={{ fontSize: 30 }} />
                  </IconButton>
                </Grid>
              </Grid>
              <FormControl size="medium" className={classes.margin}>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleFormData}
                >
                  Запазване
                </Button>
              </FormControl>
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

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(e.target);
  //   setIsOpenCreatEventModal(!isOpenCreatEventModal);
  // };

  const facebook = () => {
    firebaseFacebookAuth()
      .then(({ additionalUserInfo }) => {
        console.log(additionalUserInfo?.profile);
        if (additionalUserInfo?.profile) {
          const clientProfile = additionalUserInfo.profile as {
            given_name: string;
            family_name: string;
            email: string;
            picture: string;
          };
          console.log(clientProfile);
          setClient({
            firstName: clientProfile.given_name,
            lastName: clientProfile.family_name,
            email: clientProfile.email,
            picture: clientProfile.picture,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const google = () => {
    firebaseGoogleAuth()
      .then(({ additionalUserInfo }) => {
        console.log(additionalUserInfo?.profile);
        if (additionalUserInfo?.profile) {
          const clientProfile = additionalUserInfo.profile as {
            given_name: string;
            family_name: string;
            email: string;
            picture: string;
          };
          console.log(clientProfile);
          setClient({
            firstName: clientProfile.given_name,
            lastName: clientProfile.family_name,
            email: clientProfile.email,
            picture: clientProfile.picture,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        {schedules && (
          <Calendar
            selectable={true}
            localizer={localizer}
            events={schedules}
            defaultView="week"
            startAccessor="start"
            endAccessor="end"
            // onSelectEvent={(event) => alert(event.title)}
            onSelectSlot={handleSelect}
            style={{ height: 500 }}
          />
        )}
        {openCreatEventModal()}
      </div>
    </>
  );
};

export default SelectSchedule;