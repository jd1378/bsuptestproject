import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from "axios";
import Snotify from "vue-snotify";

// custom styles + bootstrap styles
import "./assets/css/custom.scss";

Vue.config.productionTip = false;

// config axios globally
// axios.defaults.baseUrl = "http://hiring.bsup.tk/api"
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = 5 * 1000;
// sets auth header whenever making a request
axios.interceptors.request.use(config => {
  const token = store.getters["user/token"];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

Vue.use(Snotify);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
