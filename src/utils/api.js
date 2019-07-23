import _ from "lodash";

class Api {
  /**
   * @param {String} endPoint
   * @param {import("axios").AxiosInstance} axios
   * @param {Object} snotify
   */
  constructor(endPoint, axios, snotify) {
    this.endPoint = endPoint;
    this.axios = axios;
    this.snotify = snotify;
  }

  /** for retrieving data */
  get(path, notify, notifypath = "data.message") {
    return new Promise((resolve, reject) => {
      this.axios
        .get(this.endPoint + path ? path : "")
        .then(result => {
          if (notify && this.snotify) {
            this.snotify.success(_.get(result, notifypath, "successful"));
          }
          resolve(result);
        })
        .catch(error => {
          if (notify && this.snotify) {
            this.snotify.failure(_.get(error, notifypath, "failed"));
          }
          reject(error);
        });
    });
  }

  /** for adding/posting data */
  post(data, path, notify, notifypath = "data.message") {
    return new Promise((resolve, reject) => {
      this.axios
        .post(this.endPoint + path ? path : "", data)
        .then(result => {
          if (notify && this.snotify) {
            this.snotify.success(_.get(result, notifypath, "successful"));
          }
          resolve(result);
        })
        .catch(error => {
          if (notify && this.snotify) {
            this.snotify.failure(_.get(error, notifypath, "failed"));
          }
          reject(error);
        });
    });
  }

  /** for deleting data */
  delete(path, notify, notifypath = "data.message") {
    return new Promise((resolve, reject) => {
      this.axios
        .delete(this.endPoint + path ? path : "")
        .then(result => {
          if (notify && this.snotify) {
            this.snotify.success(_.get(result, notifypath, "successful"));
          }
          resolve(result);
        })
        .catch(error => {
          if (notify && this.snotify) {
            this.snotify.failure(_.get(error, notifypath, "failed"));
          }
          reject(error);
        });
    });
  }

  /** for editing data */
  patch(data, path, notify, notifypath = "data.message") {
    this.axios
      .patch(this.endPoint + path ? path : "", data)
      .then(result => {
        if (notify && this.snotify) {
          this.snotify.success(_.get(result, notifypath, "successful"));
        }
      })
      .catch(error => {
        if (notify && this.snotify) {
          this.snotify.failure(_.get(error, notifypath, "failed"));
        }
      });
  }
}

export default Api;
