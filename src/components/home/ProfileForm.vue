<template>
  <div class="card text-center">
    <div class="card-header d-flex justify-content-between">
      <h4>Profile</h4>
      <button class="btn btn-primary" @click.stop="toggleEdit" v-if="!editmode">
        Edit
      </button>
    </div>
    <div v-if="loading">
      <div class="spinner-border p-5 m-5"></div>
    </div>
    <form @submit.prevent="checkForm" v-else>
      <fieldset :disabled="submitting">
        <div class="card-body">
          <img class="img-fluid" :src="backData.photo" alt="user picture" />
          <h5 class="card-title">Welcome, {{ backData.name }}!</h5>
          <p class="card-text">
            You can edit your profile here
          </p>
          <Error
            v-for="(errormsg, index) in errors"
            :key="index"
            class="m-2"
            :msg="errormsg"
          ></Error>

          <div
            class="d-flex flex-column align-items-center justify-content-center"
          >
            <div class="form-group col-md-4 mb-3">
              <label>Username</label>
              <input
                type="text"
                name="username"
                class="form-control"
                required=""
                v-model="userData.name"
                :disabled="!editmode"
              />
            </div>
            <div class="form-group col-md-4 mb-3">
              <label>Email</label>
              <input
                name="inputEmail"
                type="email"
                class="form-control"
                required=""
                v-model="userData.email"
                :disabled="!editmode"
              />
            </div>
          </div>
          <div
            v-if="editmode"
            class="d-flex flex-column align-items-center justify-content-center"
          >
            <div class="col-md-4 mb-3">
              <input
                v-model="userData.current_password"
                type="password"
                name="current_password"
                class="form-control"
                placeholder="Current Password"
                :required="isChangingPass || isChangingEmail"
              />
            </div>
            <div class="col-md-4 mb-3">
              <input
                v-model="userData.password"
                class="form-control"
                type="password"
                name="password"
                placeholder="New Password (optional)"
              />
            </div>
            <div class="col-md-4 mb-3">
              <input
                class="form-control"
                v-model="userData.password_confirmation"
                type="password"
                name="password_confirmation"
                placeholder="Confirm Password"
                :disabled="!isChangingPass"
              />
            </div>
            <div class="col-md-4 mb-3">
              <button
                class="btn btn-danger"
                type="button"
                @click.stop="deleteAccount"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
        <div v-if="editmode" class="card-footer d-flex justify-content-between">
          <button type="button" class="btn btn-danger" @click.stop="cancelEdit">
            Cancel
          </button>
          <button type="submit" class="btn btn-success">Done</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import _ from "lodash";
import Error from "@/components/Error.vue";
import userService from "@/services/user.service";

export default {
  data() {
    return {
      backData: {},
      userData: {},
      editmode: false,
      errors: [],
      submitting: false,
      loading: true
    };
  },
  components: {
    Error
  },
  computed: {
    isChangingEmail() {
      return this.userData.email !== this.backData.email;
    },
    isChangingPass() {
      return !!this.userData.password;
    }
  },
  methods: {
    deleteAccount() {
      this.$snotify.confirm("Are you sure ?", "Delete Account", {
        timeout: 3000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        buttons: [
          {
            text: "Yes",
            action: toast => {
              userService
                .deleteUser()
                .then(result => {
                  this.$store.dispatch("auth/logout").then(() => {
                    this.$snotify.success(result.data.message);
                  });
                })
                .catch(error => {
                  this.$snotify.error(error.response.data.message);
                });
              this.$snotify.remove(toast.id);
            },
            bold: false
          },
          {
            text: "No",
            action: toast => {
              this.$snotify.remove(toast.id);
            }
          }
        ]
      });
    },
    setUser(data) {
      this.backData = data;
      this.userData = _.clone(data);
    },
    cancelEdit() {
      this.userData = this.backData;
      this.errors = [];
      this.toggleEdit();
    },
    checkForm() {
      this.submitting = true;
      this.errors = [];
      let errors = [];
      if (
        this.userData.password &&
        this.userData.password !== this.userData.password_confirmation
      ) {
        errors.push("New passwords do not match!");
      }

      if (errors.length) {
        this.errors = errors;
      } else {
        this.$snotify.async(
          "Editing...",
          () =>
            new Promise((resolve, reject) => {
              // start checking token
              userService
                .editUser(
                  // no falsy values to be sent
                  _.pickBy(this.userData, _.identity)
                )
                .then(result => {
                  this.setUser(result.data.data);

                  //success
                  this.toggleEdit();
                  resolve({
                    body: "Edit Successful!",
                    config: {
                      timeout: 2000,
                      closeOnClick: true,
                      showProgressBar: true
                    }
                  });
                })
                .catch(error => {
                  reject({
                    body: error.message,
                    config: {
                      timeout: 4000,
                      closeOnClick: true,
                      showProgressBar: true
                    }
                  });
                  _.each(error.response.data.errors, (value, key) => {
                    errors.push(_.words(key).join(" ") + ": " + value);
                  });
                  this.errors = errors;
                })
                .finally(() => {
                  this.submitting = false;
                });
            })
        );
      }
    },
    toggleEdit() {
      this.editmode = !this.editmode;
    }
  },
  async created() {
    try {
      this.setUser(await userService.getUser());
      this.loading = false;
    } catch (err) {
      this.$router.go("/");
    }
  }
};
</script>

<style lang="scss" scoped></style>
