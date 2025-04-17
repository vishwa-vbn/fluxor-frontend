import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import RestrictedRoute from "../restricted/index";
import LoginContainer from "../common/login/loginContainer.jsx";
import AdminLoginContainer from "../common/adminLogin/loginContainer.jsx"
import resetPasswordContainer from "../common/resetPassword/resetPasswordContainer.jsx";
import SettingsContainer from "./admin/settings/settingsContainer.jsx";
import DashboardContainer from "./admin/dashboard/dashboardContainer.jsx";
import PostsContainer from "./admin/posts/postsContainer.jsx";
import CreatePostContainer from "./admin/createPost/createPostContainer.jsx";
import EditPostContainer from './admin/editpost/editpostContainer.jsx'
import CategoriesContainer from "./admin/categories/categoriesContainer.jsx";
import CommentsContainer from "./admin/comments/commentsContainer.jsx";
import TagsContainer from "./admin/tags/tagsContainer.jsx";
import UsersContainer from "./admin/users/userContainer.jsx";
import PostContainer from "./user/post/postContainer.jsx";


function App({ match }) {
  console.log("match:", match);
//   var defaultRedirection = (
//     // <Redirect exact from={`${match.url}/`} to={`${match.url}home`} />
//   );

  var routes = [
    {
      component: SettingsContainer,
      link: "settings",
    },
    {
      component: DashboardContainer,
      link: "dashboard",
    },
    {
      component: PostsContainer,
      link: "posts",
    },

    {
      component:CreatePostContainer,
      link:"create-post"
    },
    {
      component:CategoriesContainer,
      link:"categories"
    },
    {
      component:CommentsContainer,
      link:"comments"
    },
    {
      component:TagsContainer,
      link:"tags"
    },
    {
      component:EditPostContainer,
      link:"edit-post/:slug"
    },
    {
      component:UsersContainer,
      link:"users"
    },
    {
      component:PostContainer,
      link:"posts/:slug"
    }
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

    {

      component:AdminLoginContainer,
      link:"/admin/login"

    },
    {
      component: resetPasswordContainer,
      link: "/reset-password",
    },
]

  return (
    <Switch>

      {routes?.map((element) => (
        <RestrictedRoute
        exact
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
