<template>
  <div>
    <b-navbar>
      <ul class="navbar-nav">
        <router-link tag="li" class="nav-item" to="/">
          <a class="nav-link">Home</a>
        </router-link>
        <router-link v-if="isLoggedIn" tag="li" class="nav-item" to="/books">
          <a class="nav-link">Books</a>
        </router-link>
      </ul>
      <button v-if="isLoggedIn" class="btn btn-light" @click.stop="logout">
        Logout
      </button>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BNavbar from "./bootstrap/BNavbar.vue";
import { deleteCookie } from "../utils/cookiehelper";

export default {
  name: "AppNavbar",
  components: {
    BNavbar
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn"
    })
  },
  methods: {
    ...mapActions("user", {
      logoutUser: "logoutUser"
    }),
    logout() {
      this.$snotify.async(
        "Logging out",
        () =>
          new Promise((resolve, reject) => {
            this.logoutUser()
              .then(() => {
                deleteCookie("accessToken");
                resolve({
                  body: "Logout successful",
                  config: {
                    timeout: 1000,
                    closeOnClick: true,
                    showProgressBar: true
                  }
                });
              })
              .catch(error => {
                reject({
                  body: error.message,
                  config: {
                    timeout: 4000,
                    closeOnClick: true,
                    showProgressBar: true
                  }
                });
              });
          })
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
