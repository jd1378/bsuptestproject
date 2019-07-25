<template>
  <login-form></login-form>
</template>

<script>
export default {
  name: "login",
  components: {
    LoginForm: () => import("@/components/login/LoginForm.vue")
  }
};
</script>
