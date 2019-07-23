import _ from "lodash";
import axios from "axios";
import urls from "../utils/urls";

export default {
  namespaced: true,
  state: {
    selectedBook: {},
    isAddingBook: false
  },
  mutations: {
    setSelectedBook(state, selectedBook) {
      state.selectedBook = selectedBook;
    },
    setAddingBook(state, value) {
      state.isAddingBook = value;
    }
  },
  actions: {
    /** Adds a new book.
     * @param {Object} [context]
     * @param {Object} newBook - book to add
     * @param {String} newBook.title
     * @param {String} newBook.author
     * @param {Number} newBook.price
     * @param {String} [newBook.publisher] - optional
     * @param {String} [newBook.cover_url] - optional
     */
    addBook({ commit }, newBook) {
      return new Promise((resolve, reject) => {
        axios
          .post(urls.books, newBook)
          .then(result => {
            resolve(result);
          })
          .catch(reject);
      });
    },

    /**
     * Gets the book info.
     * @param {Object} [context]
     * @param {Number} bookId
     */
    getBookInfo({ commit }, bookId) {
      return new Promise((resolve, reject) => {
        axios
          .get(urls.books + "/" + bookId)
          .then(result => {
            commit("setSelectedBook", result.data);
            resolve(result.data);
          })
          .catch(reject);
      });
    },

    /**
     * Edits the book info.
     * @param {Object} [context]
     * @param {Object} book
     * @param {Number} book.id
     * @param {String} book.title
     * @param {String} book.author
     * @param {Number} book.price
     * @param {String} [book.publisher]
     * @param {String} [book.cover_url]
     */
    editBookInfo({ commit }, book) {
      return new Promise((resolve, reject) => {
        axios
          .patch(urls.books + "/" + book.id, book)
          .then(result => {
            resolve(result);
          })
          .catch(reject);
      });
    },

    /**
     * Deletes the book.
     * @param {Number} id
     */
    deleteBook({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${urls.books}/${id}`)
          .then(result => {
            resolve(result);
          })
          .catch(reject);
      });
    }
  },
  getters: {}
};
