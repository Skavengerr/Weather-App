import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import rootReducer from "./store/index";

const configureStore = (state = {}) => {
  return createStore(rootReducer, state, applyMiddleware(thunkMiddleware));
};
export default configureStore;
