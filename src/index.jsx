import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Switch, Route, Router } from "react-router-dom";

import App from "./components/pages/index";
import "./index.css";

import { configureStore, history } from "./store/configure/configureStore";
import { PersistGate } from "redux-persist/integration/react";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
export const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
