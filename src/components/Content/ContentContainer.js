import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import toastr from "toastr";
import FontAwesome from "react-fontawesome";

import styles from "./content.sass";

class ContentContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.renderHost = this.renderHost.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.error !== "") {
      toastr.error(nextProps.error);
    }
  }

  renderHost() {
    const {
      latitude,
      longitude,
      ip,
      country_code,
      country_name,
      region_code,
      region_name,
      city,
      zip_code,
      time_zone,
      metro_code
    } = this.props.hostData;
    const { hostName } = this.props;
    return (
      <div className={styles.wrapperContent}>
        <h3 className={styles.content_host}>{hostName}</h3>
        <div className={styles.tableHeader}>
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {ip && (
                <tr>
                  <td>IP</td>
                  <td>{ip}</td>
                </tr>
              )}
              {country_code && (
                <tr>
                  <td>Coutry Code</td>
                  <td>{country_code}</td>
                </tr>
              )}
              {country_name && (
                <tr>
                  <td>Coutry Name</td>
                  <td>{country_name}</td>
                </tr>
              )}
              {region_code && (
                <tr>
                  <td>Region Code</td>
                  <td>{region_code}</td>
                </tr>
              )}
              {region_name && (
                <tr>
                  <td>Region Name</td>
                  <td>{region_name}</td>
                </tr>
              )}
              {city && (
                <tr>
                  <td>City</td>
                  <td>{city}</td>
                </tr>
              )}
              {zip_code && (
                <tr>
                  <td>Zip Code</td>
                  <td>{zip_code}</td>
                </tr>
              )}
              {time_zone && (
                <tr>
                  <td>Time Zone</td>
                  <td>{time_zone}</td>
                </tr>
              )}
              {latitude && (
                <tr>
                  <td>Latitude</td>
                  <td>{latitude}</td>
                </tr>
              )}
              {longitude && (
                <tr>
                  <td>longitude</td>
                  <td>{longitude}</td>
                </tr>
              )}
              {metro_code && (
                <tr>
                  <td>Metro Code</td>
                  <td>{metro_code}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    const { hostData, error } = this.props;
    return (
      <div>
        {_.isEmpty(hostData) ? (
          <div className={error ? styles.url_error : styles.url_set}>
            <FontAwesome
              name={error !== "" ? "frown-o" : "smile-o"}
              className={styles.sadIcon}
            />
            <h3>
              {error !== "" ? error : "Faça sua Busca. Insira um Dominio"}
            </h3>
          </div>
        ) : (
          this.renderHost()
        )}
      </div>
    );
  }
}

ContentContainer.propTypes = {
  hostData: PropTypes.object.isRequired,
  hostName: PropTypes.string,
  history: PropTypes.object.isRequired,
  error: PropTypes.string
};

export default withRouter(ContentContainer);
