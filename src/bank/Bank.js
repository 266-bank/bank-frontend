import React, {useEffect, useState} from "react";
import {
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Link,
  Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

function CurrentBalance(props) {
  return <Typography variant="h4">Balance: {props.balance}</Typography>
}

function InvalidWithdrawal(props) {
  return (
    <Dialog
      open={!props.open}>
      <DialogTitle id="alert-dialog-title">You Attempted to Withdraw an Invalid Amount!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You have ${props.balance}. You attempted to withdraw ${props.amount}.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="primary">
          I Understand.
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function BankHome(props) {
  const [balance, setBalance] = useState(props.balance);
  const [amount, setAmount] = useState(0);
  const [validWithdrawal, setValidWithdrawal] = useState(true);

  const withdraw = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/withdrawal`,
      {
        method: "POST",
        body: JSON.stringify({username: props.username, password: props.password, amount: amount}),
        headers: {'Content-Type': 'application/json'}
      });

    if (response.status === 400) {
      setValidWithdrawal(false);
      return;
    }

    const json = await response.json();
    setBalance(json.balance);
  };

  const deposit = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/deposit`,
      {
        method: "POST",
        body: JSON.stringify({username: props.username, password: props.password, amount: amount}),
        headers: {'Content-Type': 'application/json'}
      });

    const json = await response.json();

    setBalance(json.balance);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/${props.username}/balance`,
      {
        headers: {'Content-Type': 'application/json', 'Authorization': props.password}
      }).then(response => response.json()).then(json => setBalance(json.balance)).catch(err => console.error(err));
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <InvalidWithdrawal open={validWithdrawal} balance={balance}
                         amount={amount}
                         close={() => setValidWithdrawal(true)}/>
      <CurrentBalance balance={balance}/>
      <CurrencyTextField
        label="Amount"
        value={amount}
        currencySymbol="$"
        maximumValue={'1000000000'}
        minimumValue={'0'}
        leadingZero={"allow"}
        fullWidth
        margin={"normal"}
        onChange={(e, value) => setAmount(value)}
      />
      <Grid container spacing={2}>
        <Grid item xs>
          <Button type="submit" fullWidth variant="contained" color="primary"
                  onClick={withdraw}>Withdraw</Button>
        </Grid>
        <Grid item xs>
          <Button type="submit" fullWidth variant="contained" color="primary"
                  onClick={deposit}>Deposit</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
        </Grid>
        <Grid item>
          <Link variant="body2" onClick={props.logout}>
            {"Logout"}
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}