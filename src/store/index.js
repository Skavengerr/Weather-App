import { combineReducers } from "redux";
import { selectedCity, forecastsByCity } from "./forecast/reducers";

export default combineReducers({
  selectedCity,
  forecastsByCity
});
