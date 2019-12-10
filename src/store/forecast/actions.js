import { getForecast } from "./api";

export const SELECT_CITY = "SELECT CITY";
export const REQUEST_FORECASTS = "REQUEST FORECASTS";
export const RECEIVE_FORECASTS = "RECEIVE FORCASTS";
export const INVALID_CITY = "INVALID CITY";

export const selectCity = city => {
  return {
    type: SELECT_CITY,
    city
  };
};

export const invalidCity = city => {
  return {
    type: INVALID_CITY,
    city
  };
};

const requestForecasts = city => {
  return {
    type: REQUEST_FORECASTS,
    city
  };
};

const receiveForecasts = (city, json) => {
  return {
    type: RECEIVE_FORECASTS,
    city,
    forecasts: json.forecasts,
    location: json.location,
    currentConditions: json.current_observation,
    receivedAt: Date.now()
  };
};

const fetchForecasts = (city, unit) => {
  return dispatch => {
    dispatch(requestForecasts(city));
    return getForecast(city, unit)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json && json.forecasts) {
          dispatch(receiveForecasts(city, json));
        }
      });
  };
};

const shouldFetchForecasts = (state, city) => {
  const forecasts = state.forecastsByCity[city];
  if (!forecasts) {
    return true;
  } else if (forecasts.isFetching) {
    return false;
  } else {
    return forecasts.didInvalidate;
  }
};

export const fetchForecastsIfNeeded = (city, unit) => {
  return (dispatch, getState) => {
    if (shouldFetchForecasts(getState(), city)) {
      return dispatch(fetchForecasts(city, unit));
    }
  };
};
