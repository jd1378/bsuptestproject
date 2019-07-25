import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/auth";

Vue.use(Vuex);

const state = {};

const mutations = {};

const getters = {};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  modules: {
    auth: auth
  }
});
