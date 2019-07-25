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
    AppNavbar: () => import("@/components/AppNavbar.vue")
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
