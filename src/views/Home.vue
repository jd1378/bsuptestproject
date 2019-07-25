<template>
  <LoginForm v-if="!isLoggedIn"></LoginForm>
  <ProfileForm v-else></ProfileForm>
</template>

<script>
import { mapGetters } from "vuex";
import { getCookie } from "../utils/cookiehelper";

export default {
  name: "home",
  components: {
    // lazy loading
    LoginForm: () => import("@/components/home/LoginForm.vue"),
    ProfileForm: () => import("@/components/home/ProfileForm.vue")
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn"
    })
  },
  mounted() {
    let accessToken = getCookie("accessToken");
    if (accessToken) {
      this.$store.commit("user/setToken", accessToken);
    }
  }
};
</script>
