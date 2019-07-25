import axios from "axios";
import { TokenService } from "@/services/storage.service";
import store from "@/store";

const ApiService = {
  _401interceptor: null,

  init(baseURL) {
    if (baseURL) {
      axios.defaults.baseURL = baseURL;
    }
  },

  setTimout(time) {
    axios.defaults.timeout = time;
  },

  setAuthHeader() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${TokenService.getToken()}`;
  },

  setHeader(name, value) {
    axios.defaults.headers.common[name] = value;
  },

  removeAuthHeader() {
    delete axios.defaults.headers.common["Authorization"];
  },

  removeHeaders() {
    axios.defaults.headers.common = {};
  },

  get(resource) {
    return axios.get(resource);
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  patch(resource, data) {
    return axios.patch(resource, data);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data);
  },

  mount401Interceptor() {
    if (this._401interceptor) {
      return;
    }
    this._401interceptor = axios.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        if (
          error.request.status == 401 &&
          !error.config.url.includes("logout")
        ) {
          store.dispatch("auth/logout");
        }

        // If error was not 401 just reject as is
        throw error;
      }
    );
  },

  unmount401Interceptor() {
    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor);
  }
};

export default ApiService;
