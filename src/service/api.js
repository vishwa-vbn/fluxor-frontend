import axios from "axios";
import { DOMAIN_API_URI, PATH_API_URI } from "./apiConstants";
import { getState, getStore } from "../store/configure/configureStore";
import { updateToken } from "../store/auth/authActions";

const AUTH = "auth/";

export default class Api {
  static actionsStack = [];

  static methods = {
    GET: "get",
    POST: "post",
    PATCH: "patch",
    PUT: "put",
    DELETE: "delete",
  };

  static get initialStatus() {
    return {
      loading: false,
      loaded: false,
      fail: false,
    };
  }

  static get requestStatus() {
    return {
      loading: true,
      loaded: false,
      fail: false,
    };
  }

  static get successStatus() {
    return {
      loading: false,
      loaded: true,
      fail: false,
    };
  }

  static get failStatus() {
    return {
      loading: false,
      loaded: false,
      fail: true,
    };
  }

  static composeRouteUrl(route) {
    if (route.startsWith("http")) {
      return route;
    }
    return `${DOMAIN_API_URI}${PATH_API_URI}${route}`;
  }

  static get(route, params) {
    return Api.request(route, params, undefined, Api.methods.GET);
  }

  static put(route, data, params) {
    return Api.request(route, params, data, Api.methods.PUT);
  }

  static patch(route, params, data) {
    return Api.request(route, params, data, Api.methods.PATCH);
  }

  static post(route, data, appendHeaders, handleFormError = true) {
    return Api.request(
      route,
      undefined,
      data,
      Api.methods.POST,
      appendHeaders,
      handleFormError
    );
  }

  static delete(route, data, params) {
    return Api.request(route, params, data, Api.methods.DELETE);
  }

  static request(
    route,
    params,
    data,
    method,
    appendHeaders,
    shallRetry = true
  ) {
    return new Promise(async (resolve, reject) => {
      const url = Api.composeRouteUrl(route, params);
      let headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "X-Requested-With": "XMLHttpRequest",
      };
      const token = "Bearer " + getState().auth.accessToken;
      const refreshToken = "Bearer " + getState().auth.refreshToken;

      // const token = Auth.getTokenFromLocalStorage();
      // console.log(getState().auth.accessToken);

      if (getState().auth.accessToken) {
        headers["Authorization"] = token;
      }
      if (appendHeaders) {
        headers = { ...headers, ...appendHeaders };
      }

      axios({
        method,
        url,
        headers,
        params,
        data,
        
      })
        .then((resp) => {
          if (resp.data.msg) {
            Api.alert(resp.data.msg);
          }

          if (resp.data.rid === "e-auth-14") {
            if (shallRetry) {
              axios({
                url: DOMAIN_API_URI + PATH_API_URI + AUTH + "token/refresh",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: refreshToken,
                },
              })
                // .then((response) => {
                //   console.log("Refresh API Response:", response);
                //   return Promise.all([
                //     response.status,
                //     response.headers,
                //     response.json(),
                //   ]);
                // })
                .then(async (responseBody) => {
                  if (responseBody.data.rid.includes("s-auth-")) {
                    getState().auth.accessToken =
                      responseBody.data.data.accessToken;
                    getStore().dispatch(
                      updateToken(
                        responseBody.data.data.accessToken,
                        responseBody.data.data.refreshToken
                      )
                    );
                    let newHeader = {
                      "Content-Type": "application/json",
                      Authorization:
                        "Bearer " + responseBody.data.data.accessToken,
                    };

                    if (appendHeaders) {
                      newHeader = { ...appendHeaders, ...newHeader };
                    }

                    try {
                      var finalData = await this.request(
                        route,
                        params,
                        data,
                        method,
                        newHeader,
                        false
                      );

                      resolve(finalData);
                    } catch (error) {
                      reject(error);
                    }
                  } else if (responseBody.rid.includes("e-auth-")) {
                    reject(resp.data);
                  }
                })
                .catch((err) => {
                  reject(err);
                });
            } else {
              reject(resp.data);
            }
          } else if (resp.data.rid.startsWith("e-")) {
            reject(resp.data);
          } else if (resp.data.rid.startsWith("s-")) {
            return resolve(resp.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
