import React, { Component } from "react";
import { Button } from '@material-ui/core'
import { connect } from "react-redux";

import { invalidCity, fetchForecastsIfNeeded } from "../store/forecast/actions";

class Refresh extends Component {
    constructor(props) {
        super(props);
        this.state = { isCelsius: true };
      }
    getTemperatureUnit = () => {
        return this.state.isCelsius ? "c" : "f";
      }

    handleRefreshClick = (e) => {
        e.preventDefault();
        const { dispatch, selectedCity } = this.props;
        dispatch(invalidCity(selectedCity));
        dispatch(fetchForecastsIfNeeded(selectedCity, this.getTemperatureUnit()));
    }

    render() {
    const {isFetching, lastUpdated} = this.props;
    return(
            <div className="flex justify-between">
                <div className="mx-4 m-auto">
                    {lastUpdated && (
                        <span>
                        Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
                        </span>
                    )}
                </div> 
                <div className="m-auto">
                    {!isFetching && (
                        <div>
                          <Button className="m-8" variant="outlined" color="primary" onClick={this.handleRefreshClick}>
                              Refresh
                          </Button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { selectedCity, forecastsByCity } = state;
    const {
      isFetching,
      lastUpdated,
      items: forecasts,
      current: currentConditions
    } = forecastsByCity[selectedCity] || {
      isFetching: true,
      items: []
    };
    return {
      isFetching,
      lastUpdated,
      forecasts,
      selectedCity,
      currentConditions
    };
  };

export default connect(mapStateToProps)(Refresh);
