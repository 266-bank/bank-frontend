import React, {useState} from "react";
import {Container, CssBaseline, Grid, Link, TextField, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {InvalidCredentials} from "./InvalidCredentials"
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

export function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [initialBalance, setInitialBalance] = useState(0);
  const [valid, setValid] = useState(true);

  const register = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user`,
      {
        method: "POST",
        body: JSON.stringify({username: username, password: password, initBal: initialBalance}),
        headers: {'Content-Type': 'application/json'}
      });
    if (response.status !== 201)
      setValid(false);
    else
      props.success(username, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <InvalidCredentials open={valid} close={() => setValid(true)}/>
      <Typography variant="h4">
        Register
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <CurrencyTextField
        label="Initial Balance"
        value={initialBalance}
        currencySymbol="$"
        maximumValue={'1000000000'}
        minimumValue={'0'}
        leadingZero={"allow"}
        fullWidth
        margin={"normal"}
        onChange={(e, value) => setInitialBalance(value)}
      />
      <Grid container justify={"space-between"} alignItems={"flex-end"}>
        <Grid item>
          <Link variant="body2" onClick={props.login}>
            {"Already have an Account? Log in."}
          </Link>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"

          onClick={register}
        >
          Register
        </Button>
      </Grid>
    </Container>
  );
}
