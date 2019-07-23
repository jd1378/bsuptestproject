<template>
  <div>Redirecting ...</div>
</template>

<script>
import { setCookie } from "../utils/cookiehelper";
/**
 * @vue-prop {String} token - token to set in cookie
 * @vue-prop {String|Number} expiresIn - the time till cookie gets expired in seconds
 */
export default {
  name: "AuthBack",
  props: {
    token: String,
    expiresIn: [String, Number]
  },
  methods: {
    redirect(url) {
      this.$router.push(url);
    }
  },
  created() {
    // after that component is created
    // save cookie for later use
    // (props are loaded by router)
    if (this.token && this.expiresIn) {
      setCookie("accessToken", this.token, this.expiresIn);
    }
    // redirect to home page
    this.redirect("/");
  }
};
</script>

<style lang="scss" scoped></style>
