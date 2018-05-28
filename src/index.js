/* eslint-disable */
import "babel-polyfill";
import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import toastr from "toastr";
import configureStore from "./store/configureStore";
import App from "./components/App";
import "jquery/dist/jquery";
import "css-reset-and-normalize-sass";
import "emoji-mart/css/emoji-mart.css";
import "toastr/build/toastr.css";
import "font-awesome/css/font-awesome.css";
import "./static/styles/global.sass";

const store = configureStore();

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-right",
  preventDuplicates: true,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
};

render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("app")
);
