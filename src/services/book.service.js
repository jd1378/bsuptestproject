import ApiService from "./api.service";

const path = "/books";

export default {
  /**
   * Gets the book info
   * @param {Number|String} bookId
   */
  async getBookInfo(bookId) {
    return (await ApiService.get(`${path}/${bookId}`)).data.data;
  },

  /**
   * Edits the book info.
   * @param {Object} book
   * @param {String} book.title
   * @param {String} book.author
   * @param {Number} book.price
   * @param {String} [book.publisher]
   * @param {String} [book.cover_url]
   */
  async addBook(book) {
    return await ApiService.post(path, book);
  },

  /**
   * Deletes the book.
   * @param {Number|String} bookId
   */
  async deleteBook(bookId) {
    return await ApiService.delete(`${path}/${bookId}`);
  },

  /**
   * Edits the book info.
   * @param {Number|String} bookId
   * @param {Object} book
   * @param {String} book.title
   * @param {String} book.author
   * @param {Number} book.price
   * @param {String} [book.publisher]
   * @param {String} [book.cover_url]
   */
  async editBook(book, bookId) {
    return await ApiService.patch(`${path}/${bookId}`, book);
  }
};
