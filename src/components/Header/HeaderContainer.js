import React, { Component } from "react";
import styles from "./header.sass";

class HeaderContainer extends Component {
  render() {
    return (
      <div className={styles.wrapperHeader}>
        <div className={styles.titles}>
          <h1 className={styles.logo}>Host Location</h1>
          <span className={styles.tagline}>
            Enter a host and know your location
          </span>
        </div>
      </div>
    );
  }
}

HeaderContainer.propTypes = {};

export default HeaderContainer;
