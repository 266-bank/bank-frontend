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

  // const withdraw = async () => {
  //   const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/withdrawal`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify({username: props.username, amount: amount}),
  //       headers: {'Content-Type': 'application/json', 'Authorization': props.password}
  //     });
  //
  //   if (response.status === 406) {
  //     setValidWithdrawal(false);
  //     return;
  //   }
  //
  //   const json = await response.json();
  //   setBalance(json.balance);
  // };
  //
  // const deposit = async () => {
  //   const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/deposit`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify({username: props.username, amount: amount}),
  //       headers: {'Content-Type': 'application/json', 'Authorization': props.password}
  //     });
  //
  //   const json = await response.json();
  //
  //   setBalance(json.balance);
  // }
    const _0x1d04=['1841030MkudJR','password','balance','5QBcbxs','env','220508WWOrxh','POST','username','3TiHxBK','application/json','3cqqkXB','/deposit','1QzfNAp','101852RGmFpj','255159jTuJlH','182943DJMjlf','json','stringify','3YWyyHW','status','REACT_APP_BACKEND_URL','110wCzTUh','6539uMbQQl','434667oKmMCH'];function _0x364c(_0x450f72,_0x1fb0aa){_0x450f72=_0x450f72-0x159;let _0x1d0488=_0x1d04[_0x450f72];return _0x1d0488;}(function(_0x2003eb,_0x19dc44){const _0x2de72e=_0x364c;while(!![]){try{const _0x41c4f9=parseInt(_0x2de72e(0x159))*-parseInt(_0x2de72e(0x15a))+parseInt(_0x2de72e(0x15f))*parseInt(_0x2de72e(0x16b))+parseInt(_0x2de72e(0x15b))*-parseInt(_0x2de72e(0x168))+parseInt(_0x2de72e(0x169))*parseInt(_0x2de72e(0x16e))+-parseInt(_0x2de72e(0x161))*parseInt(_0x2de72e(0x166))+parseInt(_0x2de72e(0x16a))*-parseInt(_0x2de72e(0x164))+parseInt(_0x2de72e(0x15c));if(_0x41c4f9===_0x19dc44)break;else _0x2003eb['push'](_0x2003eb['shift']());}catch(_0x28e52f){_0x2003eb['push'](_0x2003eb['shift']());}}}(_0x1d04,0x75457));const withdraw=async()=>{const _0x1b2af0=_0x364c,_0x2d45b6=await fetch(process[_0x1b2af0(0x160)][_0x1b2af0(0x170)]+'/withdrawal',{'method':_0x1b2af0(0x162),'body':JSON[_0x1b2af0(0x16d)]({'username':props[_0x1b2af0(0x163)],'amount':amount}),'headers':{'Content-Type':_0x1b2af0(0x165),'Authorization':props[_0x1b2af0(0x15d)]}});if(_0x2d45b6[_0x1b2af0(0x16f)]===0x196){setValidWithdrawal(![]);return;}const _0x295575=await _0x2d45b6[_0x1b2af0(0x16c)]();setBalance(_0x295575[_0x1b2af0(0x15e)]);},deposit=async()=>{const _0x4bc42f=_0x364c,_0x448fe5=await fetch(process['env']['REACT_APP_BACKEND_URL']+_0x4bc42f(0x167),{'method':'POST','body':JSON[_0x4bc42f(0x16d)]({'username':props[_0x4bc42f(0x163)],'amount':amount}),'headers':{'Content-Type':_0x4bc42f(0x165),'Authorization':props[_0x4bc42f(0x15d)]}}),_0x22fc1d=await _0x448fe5[_0x4bc42f(0x16c)]();setBalance(_0x22fc1d[_0x4bc42f(0x15e)]);};

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