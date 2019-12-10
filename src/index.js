import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Header } from "semantic-ui-react";

import configureStore from "./store";
import App from "./App.js"

import "semantic-ui-css/semantic.min.css";
import "./styles/index.css";

ReactDOM.render(
  <Provider store={configureStore()}>
    <Header size="huge" textAlign="center">
        React Weather App
    </Header>
    <App />
  </Provider>,
  document.getElementById("root")
);


