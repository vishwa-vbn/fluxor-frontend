import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Switch, Route, Router } from "react-router-dom";
import Alert from "./components/common/alert/alert";
// import Loader from "./components/common/loader/loader";
import 'react-toastify/dist/ReactToastify.css';
import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from "react-notifications-component";

import App from "./components/pages/index";
import "./index.css";

import { configureStore, history } from "./store/configure/configureStore";
import { PersistGate } from "redux-persist/integration/react";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
export const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <ReactNotifications />
      <Router history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
       <Alert/>

      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
