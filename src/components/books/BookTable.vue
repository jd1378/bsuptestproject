<template>
  <div class="card text-center">
    <div class="card-header d-flex justify-content-between">
      <h4>Books</h4>
      <input
        type="text"
        class="form-control col-4"
        placeholder="Search"
        v-model="search"
      />
      <button class="btn btn-success" @click.stop="addBook">
        Add
      </button>
    </div>
    <div class="card-body">
      <DataTable
        url="/books"
        :search="search"
        :dataFilter="filter"
        :actions="actions"
      ></DataTable>
    </div>
  </div>
</template>

<script>
import bookService from "@/services/book.service";

export default {
  components: {
    DataTable: () => import("@/components/books/DataTable.vue")
  },
  data() {
    return {
      actions: [
        {
          icon: "edit",
          class: "btn-primary",
          method: this.editBook
        },
        {
          icon: "trash",
          class: "btn-danger",
          method: this.deleteBook
        }
      ],
      search: ""
    };
  },
  computed: {},
  methods: {
    addBook() {
      this.$router.push({ name: "addBook" });
    },

    editBook(book) {
      return new Promise(resolve => {
        this.$router.push({ name: "editBook", params: { id: book.id } });
        resolve();
      });
    },

    deleteBook(book) {
      return new Promise((resolve, reject) => {
        this.$snotify.confirm("Remove " + book.id + " ?", "Confirm", {
          timeout: 3000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          buttons: [
            {
              text: "Yes",
              action: toast => {
                bookService
                  .deleteBook(book.id)
                  .then(result => {
                    this.$snotify.success(result.data.message);
                    resolve();
                  })
                  .catch(error => {
                    this.$snotify.error(error.response.data.message);
                    reject();
                  });
                this.$snotify.remove(toast.id);
              },
              bold: false
            },
            {
              text: "No",
              action: toast => {
                this.$snotify.remove(toast.id);
                reject();
              }
            }
          ]
        });
      });
    },
    /** Developement only: for changing returned urls to local ones (CORS bypass)  */
    filter(data) {
      data.path = "/books";
      for (let key in data.links) {
        if (data.links[key]) {
          data.links[key] = data.links[key].replace(
            "http://hiring.bsup.tk/api",
            ""
          );
        }
      }
      return data;
    }
  }
};
</script>

<style lang="scss" scoped></style>
