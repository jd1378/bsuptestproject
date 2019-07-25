<template>
  <div id="app" class="bg-light">
    <app-navbar></app-navbar>
    <router-view></router-view>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import AppNavbar from "./components/AppNavbar.vue";

export default {
  components: {
    AppNavbar
  },
  created() {
    //all it does is to login automatically whenever token changes
    this.$store.watch(
      (state, getters) => getters["user/token"],
      (newValue, oldValue) => {
        if (newValue && oldValue !== newValue) {
          // create a notification
          this.$snotify
            .async(
              "Authorizing",
              () =>
                new Promise((resolve, reject) => {
                  // start checking token
                  this.$store
                    .dispatch("user/getUser")
                    .then(() => {
                      //success
                      resolve({
                        body: "Authorized",
                        config: {
                          timeout: 2000,
                          closeOnClick: true,
                          showProgressBar: true
                        }
                      });
                    })
                    .catch(error => {
                      reject({
                        body: error.message + " (Click to retry)",
                        config: {
                          timeout: 4000,
                          closeOnClick: true,
                          showProgressBar: true
                        }
                      });
                    });
                })
            )
            .on("click", toast => {
              if (toast.config.type === "error") {
                this.$router.go();
              }
            });
        }
      }
    );
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
