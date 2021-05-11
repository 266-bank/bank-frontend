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
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import NumberFormat from 'react-number-format';
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

function CurrentBalance(props) {
  return (<h1>Balance: <NumberFormat thousandSeparator={true} prefix={"$"}
                                     displayType={"text"} value={props.balance}/></h1>)
}

function InvalidWithdrawal(props) {
  return (
    <Dialog
      open={!props.open}>
      <DialogTitle id="alert-dialog-title">You Attempted to Withdraw an Invalid Amount!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You have <NumberFormat thousandSeparator={true} prefix={"$"}
                                 displayType={"text"} value={props.balance}/>. You attempted to withdraw <NumberFormat
          thousandSeparator={true} prefix={"$"}
          displayType={"text"} value={props.amount}/>.
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
  const [balance, setBalance] = useState(0.0);
  const [amount, setAmount] = useState(0);
  const [validWithdrawal, setValidWithdrawal] = useState(true);

  const withdraw = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/withdrawal`,
      {
        method: "POST",
        body: JSON.stringify({username: props.username, amount: amount}),
        headers: {'Content-Type': 'application/json', 'Authorization': props.password}
      });

    if (response.status === 406) {
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
        body: JSON.stringify({username: props.username, amount: amount}),
        headers: {'Content-Type': 'application/json', 'Authorization': props.password}
      });

    const json = await response.json();

    setBalance(json.balance);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/balance/${props.username}`,
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
        maximumValue={'4294967295.99'}
        minimumValue={'0.00'}
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