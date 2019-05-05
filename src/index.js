import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import 'antd/dist/antd.css';
import "./index.css";

import { LocaleProvider } from "antd";
import ptBR from "antd/lib/locale-provider/pt_BR";

ReactDOM.render(
  <LocaleProvider locale={ptBR}>
    <App />
  </LocaleProvider>,
  document.getElementById("root")
);
