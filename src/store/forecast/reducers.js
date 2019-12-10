import {
  SELECT_CITY,
  REQUEST_FORECASTS,
  RECEIVE_FORECASTS,
  INVALID_CITY
} from "./actions";

export const selectedCity = (state = "Chernivtsi, Ukraine", action) => {
  switch (action.type) {
    case SELECT_CITY:
      return action.city;
    default:
      return state;
  }
};

const forecasts = (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    current: {}
  },
  action
) => {
  switch (action.type) {
    case REQUEST_FORECASTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_FORECASTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.forecasts,
        current: action.currentConditions,
        lastUpdated: action.receivedAt
      });
    case INVALID_CITY:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    default:
      return state;
  }
};

export const forecastsByCity = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_FORECASTS:
    case RECEIVE_FORECASTS:
    case INVALID_CITY:
      return Object.assign({}, state, {
        [action.city]: forecasts(state[action.city], action)
      });
    default:
      return state;
  }
};
