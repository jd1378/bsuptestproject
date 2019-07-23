<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark shadow-sm">
    <div class="collapse navbar-collapse justify-content-between">
      <ul class="navbar-nav">
        <router-link tag="li" class="nav-item" to="/">
          <a class="nav-link">Home</a>
        </router-link>
        <router-link v-if="isLoggedIn" tag="li" class="nav-item" to="/books">
          <a class="nav-link">Books</a>
        </router-link>
      </ul>
      <button v-if="isLoggedIn" class="btn btn-light" @click="logout">
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { deleteCookie } from "../utils/cookiehelper";

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn"
    })
  },
  methods: {
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
    },
    ...mapActions("user", {
      logoutUser: "logoutUser"
    })
  }
};
</script>

<style lang="scss" scoped></style>
