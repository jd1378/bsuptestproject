import urls from "../utils/urls";
import axios from "axios";

export default {
  namespaced: true,

  state: {
    isLoggedIn: false,
    userData: null,
    token: null
  },

  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
    setToken(state, token) {
      state.token = token;
    }
  },

  actions: {
    /** Get current user info. */
    getUser({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(urls.user)
          .then(result => {
            /**
             * example result structure:
             * {
             *  data: {
             *    id: Number,
             *    name: String,
             *    email: String,
             *    photo: String,
             *    joined_at: String
             *  }
             * }
             */
            commit("setLoggedIn", true);
            commit("setUserData", result.data.data);

            resolve(result);
          })
          .catch(reject);
      });
    },

    /** Edit user profile.
     * @param {Object} [context]
     * @param {Object} newUser - new user data
     * @param {String} newUser.name - required
     * @param {String} newUser.email - required
     * @param {String} newUser.current_password - only if changing mail or password
     * @param {String} newUser.password - only if changing mail or password
     * @param {String} newUser.password_confirmation - only if changing mail or password
     */
    editUser({ commit }, newUser) {
      return new Promise((resolve, reject) => {
        axios
          .patch(urls.user, newUser)
          .then(result => {
            console.dir(result);
            commit("setUserData", newUser);
            resolve(result);
          })
          .catch(reject);
      });
    },

    /** Delete user account. */
    deleteUser({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(urls.user)
          .then(result => {
            commit("setLoggedIn", false);
            commit("setUserData", null);
            resolve(result);
          })
          .catch(reject);
      });
    },
    /** Log the user out of the application (Revokes current access token). Doesn't work with personal access tokens.  */
    logoutUser({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .post(urls.logout)
          .then(result => {
            commit("setLoggedIn", false);
            commit("setUserData", null);
            resolve(result);
          })
          .catch(reject);
      });
    }
  },
  getters: {
    isLoggedIn({ isLoggedIn }) {
      return isLoggedIn;
    },
    token({ token }) {
      return token;
    },
    userData({ userData }) {
      return userData;
    }
  }
};
