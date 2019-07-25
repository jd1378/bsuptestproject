<template>
  <div id="app" class="bg-light">
    <app-navbar></app-navbar>
    <div class="container p-3">
      <router-view></router-view>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
export default {
  components: {
    AppNavbar: () => import("./components/AppNavbar.vue")
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
