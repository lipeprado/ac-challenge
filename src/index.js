/* eslint-disable */
import "babel-polyfill";
import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import configureStore from "./store/configureStore";
import App from "./components/App";
import "jquery/dist/jquery";
import "css-reset-and-normalize-sass";
import "emoji-mart/css/emoji-mart.css";
import "font-awesome/css/font-awesome.css";
import "./static/styles/global.sass";

const store = configureStore();

render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("app")
);
