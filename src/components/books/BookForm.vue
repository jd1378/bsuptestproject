<template>
  <form @submit.prevent="submit">
    <div class="card text-center">
      <div class="card-header d-flex justify-content-between">
        <button class="btn btn-danger" @click.stop="cancel">
          Cancel
        </button>
        <h4>{{ this.editing ? "Edit Book" : "Add Book" }}</h4>
        <button type="submit" class="btn btn-success">
          {{ editing ? "Done" : "Submit" }}
        </button>
      </div>
      <Error
        v-for="(errormsg, index) in errors"
        :key="index"
        class="m-2"
        :msg="errormsg"
      ></Error>
      <fieldset :disabled="submitting">
        <div
          class="card-body d-flex justify-content-start align-content-center"
        >
          <div class="col-3" v-if="book.cover_url">
            <img
              :src="book.cover_url"
              alt="Book Cover Image"
              class="img-thumbnail"
            />
          </div>
          <div class="d-flex flex-wrap justify-content-center">
            <div class="form-group col-md-4 mb-3">
              <label>Title</label>
              <input
                type="text"
                name="title"
                class="form-control"
                required=""
                v-model="book.title"
              />
            </div>
            <div class="form-group col-md-4 mb-3">
              <label>Author</label>
              <input
                type="text"
                name="author"
                class="form-control"
                required=""
                v-model="book.author"
              />
            </div>
            <div class="form-group col-md-4 mb-3">
              <label>Price</label>
              <input
                type="number"
                name="price"
                class="form-control"
                required=""
                v-model="book.price"
              />
            </div>
            <div class="form-group col-md-4 mb-3">
              <label>Publisher</label>
              <input
                type="text"
                name="publisher"
                class="form-control"
                v-model="book.publisher"
              />
            </div>
            <div class="form-group col-md-4 mb-3">
              <label>Cover Url</label>
              <input
                type="text"
                name="cover_url"
                class="form-control"
                v-model="book.cover_url"
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
export default {
  name: "BookForm",
  components: {
    Error: () => import("../Error.vue")
  },
  data() {
    return {
      submitting: false,
      errors: [],
      book: {}
    };
  },
  props: {
    editing: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    ...mapState("book", {
      selectedBook: state => state.selectedBook
    })
  },

  methods: {
    cancel() {
      this.$router.push({ name: "books" });
    },
    submit() {
      this.submitting = true;
      let errors = [];
      let notifyBody = this.editing ? "Edit" : "Add";
      let method = this.editing ? "editBookInfo" : "addBook";
      this.$snotify.async(
        notifyBody + "ing...",
        () =>
          new Promise((resolve, reject) => {
            this.$store
              .dispatch(
                "book/" + method,
                // no falsy values to be sent
                _.pickBy(this.book, _.identity)
              )
              .then(() => {
                //success
                this.$router.push({ name: "books" });
                resolve({
                  body: notifyBody + " Successful!",
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
  created() {
    if (this.editing) {
      if (!this.selectedBook) {
        this.$store
          .dispatch("book/getBookInfo", this.$route.params.id)
          .then(() => {
            this.book = _.clone(this.selectedBook);
          })
          .catch(() => {
            this.$router.push({ name: "books" });
          });
      }

      this.book = _.clone(this.selectedBook);
    }
  }
};
</script>

<style lang="scss" scoped></style>
