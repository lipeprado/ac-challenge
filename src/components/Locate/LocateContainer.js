import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import styles from "./locate.sass";

class LocateContainer extends Component {
  render() {
    const { onChange, onKeyDown, host, onSubmit, onClear } = this.props;
    return (
      <div className={styles.wrapperLocate}>
        <div className={styles.input_container}>
          <input
            type="text"
            onChange={onChange}
            value={host}
            onKeyDown={onKeyDown}
            placeholder="Enter with a domain here"
            className={host !== "" ? styles.input_open : styles.input}
          />
          <button onClick={onSubmit} className={styles.locate}>
            <FontAwesome name="search" className={styles.mag} />
            <span>Localizar website</span>
          </button>
          <button onClick={onSubmit} className={styles.myLocate}>
            <FontAwesome name="home" className={styles.home} />
            <span>Minha Localização</span>
          </button>
          <FontAwesome
            onClick={onClear}
            name="trash"
            className={styles.clearData}
          />
        </div>
      </div>
    );
  }
}

LocateContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  host: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired
};

export default LocateContainer;
