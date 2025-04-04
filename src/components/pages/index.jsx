import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import RestrictedRoute from "../restricted/index";
import LoginContainer from "../common/login/loginContainer.jsx";

function App({ match }) {
  console.log("match:", match);
//   var defaultRedirection = (
//     // <Redirect exact from={`${match.url}/`} to={`${match.url}home`} />
//   );

  var routes = [
    // {
    //   component: HomeContainer,
    //   link: "home",
    // },
    // {
    //   component: ChangePasswordContainer,
    //   link: "change_password",
    // },
  ];

  var login_routes = [
    {
      component: LoginContainer,
      link: "/login",
    },
]

  return (
    <Switch>

      {routes?.map((element) => (
        <RestrictedRoute
          path={`${match.url}${element.link}`}
          component={element.component}
        />
      ))}

      {login_routes?.map((element) => (
        <Route exact path={element.link} component={element.component} />
      ))}
    </Switch>
  );
}

export default App;
