import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import toastr from "toastr";

//Components
import Header from "./Header/HeaderContainer";
import Locate from "./Locate/LocateContainer";
import Content from "./Content/ContentContainer";

// Styles
import styles from "./app.sass";

// Utils
import { Api, KEY } from "../api";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      host: "",
      hostData: {},
      error: "",
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onLoading = this.onLoading.bind(this);
    this.onClear = this.onClear.bind(this);
    this.myLocation = this.myLocation.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      host: value
    });
  }

  handleKeyDown(e) {
    if ([13].indexOf(e.keyCode) !== -1) {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  isUrlValid(host) {
    const withWWW = host.match(
      /(www\.)?[-a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%+.~#?&//=]*)/g
    );
    const withouWWW = host.match(
      /[-a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%+.~#?&//=]*)/g
    );
    if (withWWW == null || withouWWW == null) {
      this.setState({
        error: "Por favor, insira uma Url válida."
      });
      return false;
    } else {
      return true;
    }
  }

  async handleSubmit() {
    const { host } = this.state;
    if (!host) {
      this.setState({
        error: "Por favor, insira algum domínio!"
      });
      return;
    }
    let finalUrl = host;
    let newHost = "";

    const hostArr = [...finalUrl];
    const { length } = hostArr;

    if (hostArr[length - 1] == "/") {
      hostArr.pop();
      finalUrl = hostArr.join("");
    }
    if (finalUrl.includes("https://")) {
      newHost = finalUrl.slice(8);
      this.isUrlValid(newHost);
    } else if (finalUrl.includes("http://")) {
      newHost = finalUrl.slice(7);
    }
    const newUrl = newHost !== "" ? newHost : finalUrl;
    if (!this.isUrlValid(newUrl)) return;
    try {
      this.setState({ loading: true });
      const response = await Api.get(`${newUrl}?access_key=${KEY}`);
      if (response.status === 200) {
        this.setState({ hostData: response.data });
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({
        loading: false,
        error: "Ops, Algo de Errado Aconteceu."
      });
    }
  }

  async myLocation() {
    try {
      this.setState({ loading: true, host: "" });
      const response = await Api.get(`check?access_key=${KEY}`);
      if (response.status === 200) {
        this.setState({ hostData: response.data });
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({
        loading: false,
        error: "Ops, Algo de Errado Aconteceu."
      });
    }
  }
  onClear() {
    this.setState({
      hostData: {},
      error: "",
      host: "",
      loading: false
    });
    toastr.info("Operação de Limpeza foi realizada com Sucesso!");
  }

  onLoading() {
    return (
      <div className={styles.onLoading}>
        <h5>Carregando </h5>
        <FontAwesome name="smile-o" spin />
      </div>
    );
  }
  render() {
    const { hostData, host, error, loading } = this.state;
    return (
      <div className={styles.container}>
        <Header />
        <Locate
          host={host}
          onClear={this.onClear}
          onKeyDown={this.handleKeyDown}
          myLocation={this.myLocation}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
        {!loading ? (
          <Content hostName={host} error={error} hostData={hostData} />
        ) : (
          this.onLoading()
        )}
      </div>
    );
  }
}

export default App;
