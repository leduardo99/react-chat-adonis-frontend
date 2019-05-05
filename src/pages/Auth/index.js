import React, { Component } from "react";

import api from "../../services/api";
import queryString from "query-string";

// import { Container } from './styles';

export default class Auth extends Component {
  async componentWillMount() {
    const { email, password } = queryString.parse(this.props.location.search);
    const { data } = await api.post("/authenticate", { email, password });
    const token = data.token;
    if (token) {
      await localStorage.setItem("authenticated", true);
      await localStorage.setItem("token", token);
      this.props.history.push("/chat");
    } else {
      this.props.history.push("/");
    }
  }
  render() {
    return <div />;
  }
}
