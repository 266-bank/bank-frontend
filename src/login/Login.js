import React, {useState} from "react";
import {Container, CssBaseline, Grid, Link, TextField, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {InvalidCredentials} from "./InvalidCredentials"

export function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);

  const login = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login/${username}`,
      {
        headers: {'Content-Type': 'application/json', 'Authorization': password}
      });
    if (response.status !== 200) setValid(false);
    else props.success(username, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <InvalidCredentials open={valid} close={() => setValid(true)}/>
      <Typography variant="h4">
        Sign in
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
      <Grid container justify={"space-between"} alignItems={"flex-end"}>
        <Grid item>
          <Link variant="body2" onClick={props.register}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={login}
        >
          Sign In
        </Button>
      </Grid>
    </Container>
  );
}
