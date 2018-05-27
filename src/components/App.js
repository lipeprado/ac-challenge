import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

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
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      host: value
    });
  }

  handleKeyDown(e) {
    if ([13, 188, 191].indexOf(e.keyCode) !== -1) {
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
    if (withWWW == null || withouWWW == null) return false;
    else return true;
  }
  async handleSubmit() {
    const { host } = this.state;
    let newHost = "";
    if (host.includes("https://")) {
      newHost = host.slice(8);
    }
    if (host.includes("http://")) {
      newHost = host.slice(7);
    }
    if (!this.isUrlValid(newHost)) {
      return this.setState({
        error: "Por favor, insira uma url válida."
      });
    }

    try {
      this.setState({
        loading: true
      });
      const response = await Api.get(`${newHost}?access_key=${KEY}`);
      if (response.status === 200) {
        this.setState({
          hostData: response.data
        });
      }
      this.setState({
        loading: false
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: "Ops, Algo de Errado Aconteceu."
      });
    }
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
          onKeyDown={this.handleKeyDown}
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
