import './App.css';
import {BankHome} from './bank/Bank';
import {Login} from './login/Login';
import {Register} from "./login/Register";
import React from 'react';
import {Container, Typography} from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      pane: "login",
    }
  }

  render() {
    switch (this.state.pane) {
      case "login":
        return (
          <Login
            success={(username, password) => this.setState({pane: "bank", username: username, password: password})}
            register={() => this.setState({pane: "register"})}
          />
        );

      case "register":
        return (
          <Register
            success={(username, password) => this.setState({pane: "bank", username: username, password: password})}
            login={() => this.setState({pane: "login"})}
          />
        );

      case "bank":
        return (
          <BankHome
            username={this.state.username}
            password={this.state.password}
            logout={() => this.setState({username: "", password: "", pane: "login"})}
          />
        );

      default:
        return (
          <Container component="main" maxWidth="xs">
            <Typography variant="h2">404</Typography>
          </Container>
        );
    }
  }
}

export default App;
