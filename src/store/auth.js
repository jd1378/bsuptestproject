import UserService from "@/services/user.service";
import { TokenService } from "@/services/storage.service";
import router from "@/router";

const state = {
  authenticating: false,
  accessToken: TokenService.getToken(),
  authenticationErrorCode: 0,
  authenticationError: ""
};

const getters = {
  isLoggedIn: state => {
    return state.accessToken ? true : false;
  },

  authenticationErrorCode: state => {
    return state.authenticationErrorCode;
  },

  authenticationError: state => {
    return state.authenticationError;
  },

  authenticating: state => {
    return state.authenticating;
  }
};

const mutations = {
  loginRequest(state) {
    state.authenticating = true;
    state.authenticationError = "";
    state.authenticationErrorCode = 0;
  },

  loginSuccess(state, accessToken) {
    state.accessToken = accessToken;
    state.authenticating = false;
  },

  loginError(state, { errorCode, errorMessage }) {
    state.authenticating = false;
    state.authenticationErrorCode = errorCode;
    state.authenticationError = errorMessage;
  },

  logoutSuccess(state) {
    state.accessToken = "";
  }
};

const actions = {
  async login({ commit }, { token, expiresIn }) {
    commit("loginRequest");

    try {
      await UserService.login(token, expiresIn);
      commit("loginSuccess", token);

      // Redirect the user to the page he first tried to visit or to the home view
      router.push(router.history.current.query.redirect || "/");

      return true;
    } catch (e) {
      return false;
    }
  },

  async logout({ commit }) {
    await UserService.logout();
    commit("logoutSuccess");
    router.push("/login");
    Promise.resolve();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
