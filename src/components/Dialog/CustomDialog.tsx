import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { Action } from "../CustomTable/CustomTable";

type Props = {
  open: boolean;
  handleClose: () => void;
  action: "edit" | "delete" | undefined;
  handleAllActions: (action: Action) => void;
};

const CustomDialog = ({
  open,
  handleClose,
  action,
  handleAllActions,
}: Props) => {
  const handleExecuteAction = () => {
    if (action) handleAllActions(action);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleExecuteAction} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomDialog;
