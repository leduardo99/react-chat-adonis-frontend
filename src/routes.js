import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Main from "./pages/Main";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";

// import { Container } from './styles';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("authenticated") ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location
              }
            }}
          />
        )
      }
    />
  );
}

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/register" component={Register} />
          <Route path="/auth" component={Auth} />
          <PrivateRoute path="/chat" component={Chat} />
        </Switch>
      </BrowserRouter>
    );
  }
}
