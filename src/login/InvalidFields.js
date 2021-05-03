import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";

export function InvalidFields(props) {
  return (
    <Dialog
      open={!props.open}>
      <DialogTitle id="alert-dialog-title">Invalid Fields!</DialogTitle>
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
