<template>
  <div class="container">
    <div class="py-5 text-center">
      <h2>Personal Library</h2>
      <p class="lead">Use One Of Methods Below To Sign In</p>
    </div>
    <form method="get" action="http://hiring.bsup.tk/oauth/authorize">
      <input name="client_id" value="50" hidden />
      <input name="response_type" value="token" hidden />
      <div class="form-row d-flex justify-content-center">
        <button type="submit" class="btn btn-outline-primary col-3 col-md-2">
          OAuth
        </button>
        <div class="btn-group btn-group-toggle col-3 col-md-2">
          <label
            class="btn btn-outline-secondary"
            :class="{ active: showPATInput }"
          >
            <input
              v-model="showPATInput"
              type="checkbox"
              checked
              autocomplete="off"
            />
            Personal Token
          </label>
        </div>
      </div>
    </form>
    <form @submit.stop="setAuth">
      <transition name="slide-fade">
        <div
          v-if="showPATInput"
          class="form-row d-flex justify-content-center m-3"
        >
          <div class="input-group col-md-7">
            <input
              type="text"
              ref="PATInput"
              class="form-control"
              placeholder="Enter AccessToken"
              v-model="PATValue"
              autofocus=""
            />
            <div class="input-group-append">
              <button
                type="Submit"
                class="btn btn-primary "
                :disabled="PATValue === ''"
              >
                Use
              </button>
            </div>
          </div>
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPATInput: false,
      PATValue: ""
    };
  },
  methods: {
    setAuth() {
      if (this.PATValue.trim()) {
        this.$router.push({
          name: "authback",
          query: { access_token: this.PATValue.trim(), expires_in: 9999999 }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-1.5rem);
  opacity: 0;
}
</style>
