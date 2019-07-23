<template>
  <div class="alert alert-danger text-center" role="alert">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "Error",
  props: {
    msg: String
  }
};
</script>

<style lang="scss" scoped></style>
