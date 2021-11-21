import React, { ReactElement } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Popover,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: { pointerEvents: "none" },
    paper: { padding: theme.spacing(1) },
  })
);

type Props = { value: string; children: ReactElement<any, any> };

export default function CustomMouseOverPopover({ value, children }: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {value}
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{ paper: classes.paper }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {children}
      </Popover>
    </>
  );
}
