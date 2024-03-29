import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import spotsReducer from "./spot";
import sessionReducer from "./session";
import reviewsReducer from "./review";
import uiReducer from "./ui";

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  reviews: reviewsReducer,
  ui: uiReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
