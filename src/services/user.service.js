import ApiService from "@/services/api.service";
import { TokenService } from "@/services/storage.service";

const path = "/user";

const UserService = {
  /**
   * Login the user
   * @param {String} accessToken
   * @param {String|Number} expiresIn - in seconds
   **/
  login(accessToken, expiresIn) {
    // no login api , so just setting access token
    TokenService.saveToken(accessToken, expiresIn);
    ApiService.setAuthHeader();
    ApiService.mount401Interceptor();
  },

  async getUser() {
    return (await ApiService.get(path)).data.data;
  },

  /** Edit user profile.
   * @param {Object} user - new user data
   * @param {String} user.name - required
   * @param {String} user.email - required
   * @param {String} [user.current_password ]- only if changing mail or password
   * @param {String} [user.password] - only if changing mail or password
   * @param {String} [user.password_confirmation] - only if changing mail or password
   */
  async editUser(user) {
    return await ApiService.patch(path, user);
  },

  async deleteUser() {
    return await ApiService.delete(path);
  },

  /**
   * Logout the current user by requesting logout and removing the token from storage.
   *
   * Will also remove `Authorization Bearer <token>` header from future requests.
   **/
  async logout() {
    // Remove the token and remove Authorization header from Api Service as well
    try {
      await ApiService.post("/logout");
    } catch {
      console.log("Failed to send logout request, proceeding anyway");
    }
    TokenService.removeToken();
    ApiService.removeAuthHeader();
    ApiService.unmount401Interceptor();
  }
};

export default UserService;

export { UserService };
