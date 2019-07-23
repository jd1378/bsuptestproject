import Vue from "vue";
import Vuex from "vuex";
import Book from "./store/book";
import User from "./store/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    addingBook: false
  },
  mutations: {
    setAddingBook(state, value) {
      state.addingBook = value;
    }
  },
  actions: {},
  modules: {
    book: Book,
    user: User
  },
  getters: {}
});
