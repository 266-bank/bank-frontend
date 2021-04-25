import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";

export function InvalidCredentials(props) {
  return (
    <Dialog
      open={!props.open}>
      <DialogTitle id="alert-dialog-title">Invalid Credentials!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Invalid username/password. Please try again.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="primary">
          I Understand
        </Button>
      </DialogActions>
    </Dialog>);
}
