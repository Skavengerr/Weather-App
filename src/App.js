import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { selectCity, invalidCity, fetchForecastsIfNeeded } from "./store/forecast/actions";
import Controls from "./components/Controls";
import Forecasts from "./components/Forecasts";
import CurrentConditions from "./components/CurrentConditions";
import Refresh from "./components/Refresh";
import { locations } from "./locations";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isCelsius: true };
  }

  componentDidMount() {
    const { dispatch, selectedCity } = this.props;
    dispatch(fetchForecastsIfNeeded(selectedCity, this.getTemperatureUnit()));
  }

  componentDidUpdate = prevProps => {
    if (this.props.selectedCity !== prevProps.selectedCity) {
      const { dispatch, selectedCity } = this.props;
      dispatch(fetchForecastsIfNeeded(selectedCity, this.getTemperatureUnit()));
    }
  }

  handleChange = (e, { value }) => {
    this.props.dispatch(selectCity(value));
    this.props.dispatch(
      fetchForecastsIfNeeded(value, this.getTemperatureUnit())
    );
  }

  handleUnitsChange = (e, { checked }) => {
    this.setState(
      (state, props) => ({
        isCelsius: !checked
      }),
      () => {
        const { dispatch, selectedCity } = this.props;
        dispatch(invalidCity(selectedCity));
        dispatch(
          fetchForecastsIfNeeded(selectedCity, this.getTemperatureUnit())
        );
      }
    );
  }

  getTemperatureUnit = () => {
    return this.state.isCelsius ? "c" : "f";
  }

  render() {
    const { selectedCity, forecasts, isFetching, currentConditions } = this.props;
    return (
      <div className="max-w-6xl m-auto">
        <div className="flex justify-between">
          <Controls
            value={selectedCity}
            onChange={this.handleChange}
            options={locations}
            onRadioChange={this.handleUnitsChange}
            isCelsius={this.state.isCelsius}
          />        
          <Refresh/>
        </div>
        {isFetching && forecasts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && forecasts.length === 0 && <h2>Empty.</h2>}
        {forecasts.length > 0 && (
          <div className="my-8" style={{ opacity: isFetching ? 0.5 : 1 }}>
            <CurrentConditions
              currentConditions={currentConditions}
              location={selectedCity}
              isCelsius={this.state.isCelsius}
            />
            <Forecasts forecasts={forecasts} />
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedCity: PropTypes.string.isRequired,
  forecasts: PropTypes.array.isRequired,
  lastUpdated: PropTypes.number,
  isFetching: PropTypes.bool.isRequired
};

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

export default connect(mapStateToProps)(App);
