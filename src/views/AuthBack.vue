<template>
  <div>Redirecting ...</div>
</template>

<script>
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
  created() {
    // after that component is created
    // save cookie for later use
    // (props are loaded by router)
    if (this.token && this.expiresIn) {
      this.$store.dispatch("auth/login", {
        token: this.token,
        expiresIn: this.expiresIn
      });
    } else {
      // redirect to home page
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped></style>
