import Vue from "vue";
import App from "@/App.vue";
import store from "@/store";
import router from "@/router";
import Snotify from "vue-snotify";
import { TokenService } from "@/services/storage.service";
import ApiService from "@/services/api.service";

// custom styles + bootstrap styles
import "@/assets/css/custom.scss";

Vue.config.productionTip = false;

// Set the base URL of the API
ApiService.init(
  process.env.VUE_APP_ROOT_API ? process.env.VUE_APP_ROOT_API : ""
);

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setAuthHeader();
  ApiService.mount401Interceptor();
}
ApiService.setHeader("Accept", "application/json");
ApiService.setTimout(5 * 1000);

Vue.use(Snotify);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
