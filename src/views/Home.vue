<template>
  <profile-form></profile-form>
</template>

<script>
export default {
  name: "home",
  components: {
    ProfileForm: () => import("@/components/home/ProfileForm.vue")
  }
};
</script>
